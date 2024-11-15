import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { interview } from "../infrastructure/database/monogoDB/models";
import { v4 as uuidV4 } from "uuid";

interface IUser {
  peerId: string;
  userName: string;
}

interface IRoomParams {
  roomId: string;
  peerId: string;
}

interface IJoinRoomParams extends IRoomParams {
  userName: string;
}

interface IMessage {
  content: string;
  author?: string;
  timestamp: number;
}

const rooms: Record<string, Record<string, IUser>> = {};
const chats: Record<string, IMessage[]> = {};

export const socket = (server: HttpServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    const createRoom = () => {
      const roomId = uuidV4();
      rooms[roomId] = {};
      socket.emit("room-created", { roomId });
      console.log("user created the room");
    };

    const joinRoom = async ({ roomId, peerId, userName }: IJoinRoomParams) => {
      if (!rooms[roomId]) rooms[roomId] = {};
      if (!chats[roomId]) chats[roomId] = [];
      socket.emit("get-messages", chats[roomId]);
      console.log("user joined the room", roomId, peerId, userName);
      rooms[roomId][peerId] = { peerId, userName };
      const length = Object.keys(rooms[roomId]).length;
      console.log("🚀 ~ file: socket.ts:53 ~ joinRoom ~ length:", length);

      socket.on("find-roomlength", ({ roomId }) => {
        io.to(roomId).emit("room-length", length);
      });
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId, userName });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
      await updateParticipantCount(roomId, length);

      socket.on("disconnect", () => {
        console.log("user left the room", peerId);
        leaveRoom({ roomId, peerId });
      });
    };

   const leaveRoom = async ({ peerId, roomId }: IRoomParams) => {
     if (rooms[roomId] && rooms[roomId][peerId]) {
       const userName = rooms[roomId][peerId].userName;
       delete rooms[roomId][peerId];
       const length = Object.keys(rooms[roomId]).length;

       io.to(roomId).emit("user-disconnected", peerId);
       io.to(roomId).emit("get-users", {
         roomId,
         participants: rooms[roomId],
       });
       io.to(roomId).emit("room-length", length);

       console.log(`User ${userName} (${peerId}) left room ${roomId}`);
       await updateParticipantCount(roomId, length);

       
       if (length === 0) {
         delete rooms[roomId];
         delete chats[roomId];
         console.log(`Room ${roomId} deleted as it's now empty`);
          
       }
     }
   };

    const updateParticipantCount = async (roomId: string, count: number) => {
      try {
        const updatedInterview = await interview.findOneAndUpdate(
          { uniqueId: roomId },
          { meetParticipants: count },
          { new: true }
        );
        return updatedInterview;
      } catch (error) {
        console.error(
          `Failed to update participant count for room ${roomId}:`,
          error
        );
        throw error;
      }
    };

    const startSharing = ({ peerId, roomId }: IRoomParams) => {
      console.log({ roomId, peerId });
      socket.to(roomId).emit("user-started-sharing", peerId);
    };

    const stopSharing = (roomId: string) => {
      socket.to(roomId).emit("user-stopped-sharing");
    };

    const addMessage = (roomId: string, message: IMessage) => {
      console.log({ message });
      if (chats[roomId]) {
        chats[roomId].push(message);
      } else {
        chats[roomId] = [message];
      }
      io.to(roomId).emit("add-message", message);
    };

    const changeName = ({
      peerId,
      userName,
      roomId,
    }: {
      peerId: string;
      userName: string;
      roomId: string;
    }) => {
      if (rooms[roomId] && rooms[roomId][peerId]) {
        rooms[roomId][peerId].userName = userName;
        io.to(roomId).emit("name-changed", { peerId, userName });
      }
    };

    socket.on("open-codeEditor", ({ roomId }) => {
      console.log("Auto-open terminal event emitted for room:", roomId);
      io.to(roomId).emit("auto-openTerminal", true);
    });

    socket.on("open-outputBox", ({ roomId, showOutput }) => {
      console.log("event room:", roomId);
      io.to(roomId).emit("outputBox-open", showOutput);
    });

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on("code-change", ({ roomId, content }) => {
      io.to(roomId).emit("update-code", content);
    });
    socket.on("leave-room", ({ roomId, peerId,email }) => {
      console.log("🚀 ~ file: socket.ts:165 ~ socket.on ~ email:", email)
      leaveRoom({ roomId, peerId });
      socket.leave(roomId);
    });
    socket.on("feedback-submitted", async ({ roomId, email, rating }) => {
      io.to(roomId).emit("feedback-received", { email, rating });
    });

    socket.on("Interviewer-left", async ({ roomId, peerId }) => {
      if (rooms[roomId]) {
        io.to(roomId).emit(
          "meet-close",
          "The meeting has ended. The interviewer has left."
        );

        // Disconnect all users in the room
        const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
        if (socketsInRoom) {
          for (const socketId of socketsInRoom) {
            const socket = io.sockets.sockets.get(socketId);
            if (socket) {
              socket.leave(roomId);
              socket.disconnect(true);
            }
          }
        }

        // Clean up the room
        delete rooms[roomId];
        delete chats[roomId];

        // Update the interview status in the database
        await interview.findOneAndUpdate(
          { uniqueId: roomId },
          { interviewStatus: "Completed", meetParticipants: 0 },
          { new: true }
        );

        console.log(
          `Room ${roomId} has been deleted due to interviewer leaving`
        );
      }
    });
    socket.on("select-language", ({ language, roomId }) => {
      console.log(
        language,
        roomId,
        "____________________________________________"
      );
      io.to(roomId).emit("setup-selected-language", language);
    });

    socket.on("start-sharing", startSharing);
    socket.on("stop-sharing", stopSharing);
    socket.on("send-message", addMessage);
    socket.on("change-name", changeName);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      // for (const [roomId, roomData] of Object.entries(rooms)) {
      //   if (roomData[socket.id]) {
      //     delete roomData[socket.id];

      //     if (Object.keys(roomData).length === 1) {
      //       delete rooms[roomId];
      //       delete chats[roomId];
      //       console.log(`Room ${roomId} deleted after last user disconnected`);
      //     } else {
      //       socket.to(roomId).emit("user-disconnected", socket.id);
      //     }
      //   }
      // }
    });
  });
};
