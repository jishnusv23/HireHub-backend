import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

let onlineUsers = new Map<string, string>();
let onlineUsersList: { userId: string; socketId: string }[] = [];

export const socket = (server: HTTPServer) => {
  console.log("frontend url.............", process.env.FRONT_END_URL);
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRONT_END_URL || "*",
    },
  });
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId;
    console.log("🚀 ~ file: socket.ts:16 ~ io.on ~ userId:", userId);

    console.log(socket.id, "socket id...........");
    socket.on("new-user", (userId: string) => {
      console.log("new-userId", userId);
      onlineUsers.set(userId, socket.id);
      const existingUserIndex = onlineUsersList.findIndex(
        (user) => user.userId === userId
      );

      if (existingUserIndex === -1) {
        onlineUsersList.push({ userId, socketId: socket.id });
      } else {
        onlineUsersList[existingUserIndex].socketId = socket.id;
      }
      console.log("online-users", onlineUsersList);
      io.emit("online-users", onlineUsersList);
    });
    socket.on("join-room", (roomId: string) => {
      console.log("roomId", roomId);
      socket.join(roomId);
    });
    //video-call
    socket.on("start-call", ({ roomId, id }) => {
      console.log("rommId-video call", roomId);
      console.log(id, "userId");
      socket.to(roomId).emit("incoming-call", id);
      console.log("emitted->", userId);
    });
    socket.on("end-call", (roomId) => {
      socket.to(roomId).emit("end-call");
    });
    socket.on("disconnect", async () => {
      let disconnectUserId: string | undefined;
      for (const [userId, socketId] of onlineUsers) {
        if (socketId == socket.id) {
          disconnectUserId = userId;
          break;
        }
      }
      if (disconnectUserId) {
        onlineUsers.delete(disconnectUserId);
        onlineUsersList = onlineUsersList.filter(
          (user) => user.socketId !== socket.id
        );
        io.emit("online-users", onlineUsersList);
      }
    });
  });
  io.on("error", (error: any) => {
    console.error("socket.io error", error);
  });

  return io;
};
