// import { Server as SocketIOServer, Socket } from "socket.io";
// import { Server as HTTPServer } from "http";
// import { v4 as uuidv4 } from "uuid";

// interface Participant {
//   userId: string;
//   socketId: string;
//   peerId:string
// }

// interface GroupCallRoom {
//   peerId: string;
//   hostName: string;
//   socketId: string;
//   roomId: string;
// }

// type Room = any;

// const rooms: Map<string, Room> = new Map();
// let peers: Participant[] = [];
// let groupCallRooms: GroupCallRoom[] = [];

// export const socket = (server: HTTPServer) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket: Socket) => {
//     console.log("New user connected:", socket.id);

//     socket.emit("connection", { socketId: socket.id });

//     socket.on(
//       "register-new-user",
//       (data: { userId: string;peerId:string, socketId: string }) => {
//         const { userId, socketId, peerId } = data;
//         console.log("🚀 ~ file: socket.ts:42 ~ io.on ~ data: register-new-user", data)
//         peers.push({ userId, socketId, peerId });
//         io.emit("active-users", { activeUsers: peers });
//         io.emit("group-call-rooms", { groupCallRooms });
//       }
//     );

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);

//       peers = peers.filter((peer) => peer.socketId !== socket.id);
//       io.emit("active-users", { activeUsers: peers });

//       groupCallRooms = groupCallRooms.filter((room) => {
//         if (room.socketId === socket.id) {
//           io.to(room.roomId).emit("group-call-closed", { roomId: room.roomId });
//           return false;
//         }
//         return true;
//       });
//       io.emit("group-call-rooms", { groupCallRooms });

//       groupCallRooms.forEach((room) => {
//         socket.leave(room.roomId);
//         io.to(room.roomId).emit("user-left-group-call", {
//           socketId: socket.id,
//         });
//       });
//     });

//     socket.on(
//       "pre-offer",
//       (data: { calleeSocketId: string; callerUsername: string }) => {
//         io.to(data.calleeSocketId).emit("pre-offer", {
//           callerUsername: data.callerUsername,
//           callerSocketId: socket.id,
//         });
//       }
//     );

//     socket.on(
//       "pre-offer-answer",
//       (data: { callerSocketId: string; answer: string }) => {
//         io.to(data.callerSocketId).emit("pre-offer-answer", {
//           answer: data.answer,
//         });
//       }
//     );

//     socket.on(
//       "webRTC-offer",
//       (data: { calleeSocketId: string; offer: any }) => {
//         io.to(data.calleeSocketId).emit("webRTC-offer", { offer: data.offer });
//       }
//     );

//     socket.on(
//       "webRTC-answer",
//       (data: { callerSocketId: string; answer: any }) => {
//         io.to(data.callerSocketId).emit("webRTC-answer", {
//           answer: data.answer,
//         });
//       }
//     );

//     socket.on(
//       "webRTC-candidate",
//       (data: { connectedUserSocketId: string; candidate: any }) => {
//         io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
//           candidate: data.candidate,
//         });
//       }
//     );

//     socket.on("user-hanged-up", (data: { connectedUserSocketId: string }) => {
//       io.to(data.connectedUserSocketId).emit("user-hanged-up");
//     });

//     socket.on(
//       "group-call-register",
//       (data: { peerId: string; userId:string, username: string; roomId: string }) => {
//         socket.join(data.roomId);
//         console.log(data.roomId, "room id");
//         console.log(
//           `Room ${data.roomId} has ${rooms.size} users rooms[data.roomId]`
//         );
//           const room = io.sockets.adapter.rooms.get(data.roomId);
//           const roomSize = room ? room.size : 0;

//           console.log(`Room ${data.roomId} has ${roomSize} participant(s)`);

//           // Log the participants in the room
//           const participants = [...(room?.values() || [])];
//           console.log(`Participants in Room ${data.roomId}:`, participants);

//         const newGroupCallRoom: GroupCallRoom = {
//           peerId: data.peerId,
//           hostName: data.username,
//           socketId: socket.id,
//           roomId: data.roomId,
//         };

//         groupCallRooms.push(newGroupCallRoom);
//         const uniqueGroupCallRooms = groupCallRooms.filter(
//           (room, index, self) =>
//             index === self.findIndex((r) => r.roomId === room.roomId)
//         );

//         console.log("Unique Group Call Rooms:", uniqueGroupCallRooms);

//         io.emit("group-call-rooms", { groupCallRooms });
//       }
//     );

//     socket.on(
//       "group-call-join-request",
//       (data: { roomId: string; peerId: string; streamId: string }) => {
//         socket.join(data.roomId);
//         io.to(data.roomId).emit("group-call-join-request", {
//           peerId: data.peerId,
//           streamId: data.streamId,
//         });
//       }
//     );

//     socket.on(
//       "group-call-user-left",
//       (data: { roomId: string; streamId: string }) => {
//         socket.leave(data.roomId);
//         io.to(data.roomId).emit("group-call-user-left", {
//           streamId: data.streamId,
//         });
//       }
//     );

//     socket.on("group-call-closed-by-host", (data: { peerId: string }) => {
//       groupCallRooms = groupCallRooms.filter((room) => {
//         if (room.peerId === data.peerId) {
//           io.to(room.roomId).emit("group-call-closed", { roomId: room.roomId });
//           return false;
//         }
//         return true;
//       });
//       io.emit("group-call-rooms", { groupCallRooms });
//     });
//   });

//   console.log("Socket.IO server initialized.");
// };
import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer;
let onlineUsers: { userId: string; socketId: string }[] = [];
let InterviewRoom: string = "";
let rooms: { [key: string]: string[] } = {};

export const socket = (server: Server) => {
  if (!io) {
    io = new SocketIOServer(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log("Socket connected in backend", socket.id);

      socket.on("new-user", (userId: string) => {
        onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
        if (userId) {
          onlineUsers.push({ userId: userId, socketId: socket.id });
          io.emit("online-users", onlineUsers);
        }
        console.log("Online users:", onlineUsers);
      });

      socket.on("join-room", async (roomId: string, senderId: string) => {
        socket.join(roomId);
        console.log(`User ${senderId} joined room ${roomId}`);
      });

      socket.on("room-joined", ({ roomId, id }) => {
        socket.join(roomId);
        if (!rooms[roomId]) {
          rooms[roomId] = [];
        }
        rooms[roomId].push(id);
        console.log(`Users in room ${roomId}:`, rooms[roomId]);

        socket.emit(
          "user-list",
          rooms[roomId].filter((userId: string) => userId !== id)
        );

        io.to(roomId).emit("new-user-joined", id);
        io.to(roomId).emit("room-users", rooms[roomId]);
      });

      socket.on("interviewCurrentRoom", (room: string) => {
        InterviewRoom = room;
        console.log("Interview current room:", InterviewRoom);
      });

      socket.on("logout-user", (userId: string) => {
        onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
        io.emit("online-users", onlineUsers);
      });

      socket.on("disconnect", () => {
        const userRoom = Object.keys(rooms).find((roomId) =>
          rooms[roomId].includes(socket.id)
        );

        if (userRoom) {
          rooms[userRoom] = rooms[userRoom].filter((id) => id !== socket.id);
          io.to(userRoom).emit("user-disconnected", socket.id);
          io.to(userRoom).emit("room-users", rooms[userRoom]);
        }

        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("online-users", onlineUsers);
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }
  return io;
};