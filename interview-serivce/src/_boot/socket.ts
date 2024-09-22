
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
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

    const joinRoom = ({ roomId, peerId, userName }: IJoinRoomParams) => {
      if (!rooms[roomId]) rooms[roomId] = {};
      if (!chats[roomId]) chats[roomId] = [];
      socket.emit("get-messages", chats[roomId]);
      console.log("user joined the room", roomId, peerId, userName);
      rooms[roomId][peerId] = { peerId, userName };
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId, userName });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });

      socket.on("disconnect", () => {
        console.log("user left the room", peerId);
        leaveRoom({ roomId, peerId });
      });
    };

   
   
    const leaveRoom = ({ peerId, roomId }: IRoomParams) => {
      if (rooms[roomId] && rooms[roomId][peerId]) {
        const userName = rooms[roomId][peerId].userName;
        delete rooms[roomId][peerId];
        io.to(roomId).emit("user-disconnected", peerId);
        io.to(roomId).emit("get-users", {
          roomId,
          participants: rooms[roomId],
        });
        console.log(`User ${userName} (${peerId}) left room ${roomId}`);
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

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
     socket.on("leave-room", ({ roomId, peerId }) => {
      leaveRoom({ roomId, peerId });
      socket.leave(roomId);
    });
    socket.on("start-sharing", startSharing);
    socket.on("stop-sharing", stopSharing);
    socket.on("send-message", addMessage);
    socket.on("change-name", changeName);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};