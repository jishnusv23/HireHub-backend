// src/server/socket.ts

// import { Server as SocketIOServer, Socket } from "socket.io";
// import { Server as HTTPServer } from "http";
// import { v4 as uuidv4 } from "uuid";

// // Define interfaces for clarity and type safety
// interface Participant {
//   username: string;
//   socketId: string;
// }

// interface GroupCallRoom {
//   peerId: string;
//   hostName: string;
//   socketId: string;
//   roomId: string;
// }

// interface BroadcastEventTypes {
//   ACTIVE_USERS: string;
//   GROUP_CALL_ROOMS: string;
// }
// type Room = any;
// // Initialize data structures with appropriate types
// const rooms: Map<string, Room> = new Map();
// let peers: Participant[] = [];
// let groupCallRooms: GroupCallRoom[] = [];

// const broadcastEventTypes: BroadcastEventTypes = {
//   ACTIVE_USERS: "ACTIVE_USERS",
//   GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
// };

// export const socket = (server: HTTPServer) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: "*", // Update this in production to restrict origins

//     },
//   });

//   io.on("connection", (socket: Socket) => {
//     console.log("New user connected:", socket.id);

//     // Emit a connection acknowledgment
//     socket.emit("connection", { socketId: socket.id });

//     // Handle user registration
//     socket.on(
//       "register-new-user",
//       (data: { username: string; socketId: string }) => {
//         const { username, socketId } = data;
//         peers.push({ username, socketId });
//         console.log("Registered new user:", username, socketId);

//         // Broadcast active users
//         io.emit("active-users", { activeUsers: peers });

//         // Broadcast group call rooms
//         io.emit("group-call-rooms", { groupCallRooms });
//       }
//     );

//     // Handle user disconnection
//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);

//       // Remove from peers
//       peers = peers.filter((peer) => peer.socketId !== socket.id);
//       io.emit("active-users", { activeUsers: peers });

//       // Remove from group call rooms if host
//       groupCallRooms = groupCallRooms.filter((room) => {
//         if (room.socketId === socket.id) {
//           // Notify other participants that the room is closed
//           io.to(room.roomId).emit("group-call-closed", { roomId: room.roomId });
//           return false; // Remove this room
//         }
//         return true;
//       });
//       io.emit("group-call-rooms", { groupCallRooms });

//       // Additionally, remove the user from any rooms they're part of
//       groupCallRooms.forEach((room) => {
//         socket.leave(room.roomId);
//         io.to(room.roomId).emit("user-left-group-call", {
//           socketId: socket.id,
//         });
//       });
//     });

//     // Direct Call Events
//     socket.on(
//       "pre-offer",
//       (data: { calleeSocketId: string; callerUsername: string }) => {
//         console.log("Pre-offer received:", data);
//         io.to(data.calleeSocketId).emit("pre-offer", {
//           callerUsername: data.callerUsername,
//           callerSocketId: socket.id,
//         });
//       }
//     );

//     socket.on(
//       "pre-offer-answer",
//       (data: { callerSocketId: string; answer: string }) => {
//         console.log("Pre-offer answer received:", data);
//         io.to(data.callerSocketId).emit("pre-offer-answer", {
//           answer: data.answer,
//         });
//       }
//     );

//     socket.on(
//       "webRTC-offer",
//       (data: { calleeSocketId: string; offer: any }) => {
//         console.log("WebRTC offer received:", data);
//         io.to(data.calleeSocketId).emit("webRTC-offer", { offer: data.offer });
//       }
//     );

//     socket.on(
//       "webRTC-answer",
//       (data: { callerSocketId: string; answer: any }) => {
//         console.log("WebRTC answer received:", data);
//         io.to(data.callerSocketId).emit("webRTC-answer", {
//           answer: data.answer,
//         });
//       }
//     );

//     socket.on(
//       "webRTC-candidate",
//       (data: { connectedUserSocketId: string; candidate: any }) => {
//         console.log("WebRTC candidate received:", data);
//         io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
//           candidate: data.candidate,
//         });
//       }
//     );

//     socket.on("user-hanged-up", (data: { connectedUserSocketId: string }) => {
//       console.log("User hung up:", data);
//       io.to(data.connectedUserSocketId).emit("user-hanged-up");
//     });

//     // Group Call Events
//     socket.on(
//       "group-call-register",
//       (data: { peerId: string; username: string; uniqueId:string }) => {

//         socket.join(uniqueId);

//         const newGroupCallRoom: GroupCallRoom = {
//           peerId: data.peerId,
//           hostName: data.username,
//           socketId: socket.id,
//           roomId: data.uniqueId,
//         };

//         groupCallRooms.push(newGroupCallRoom);
//         console.log("Group call room created:", newGroupCallRoom);

//         io.emit("group-call-rooms", { groupCallRooms });
//       }
//     );

//     socket.on(
//       "group-call-join-request",
//       (data: { roomId: string; peerId: string; streamId: string }) => {
//         console.log("Group call join request:", data);
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
//         console.log("User left group call:", data);
//         socket.leave(data.roomId);
//         io.to(data.roomId).emit("group-call-user-left", {
//           streamId: data.streamId,
//         });
//       }
//     );

//     socket.on("group-call-closed-by-host", (data: { peerId: string }) => {
//       console.log("Group call closed by host:", data);
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
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { v4 as uuidv4 } from "uuid";

interface Participant {
  username: string;
  socketId: string;
}

interface GroupCallRoom {
  peerId: string;
  hostName: string;
  socketId: string;
  roomId: string;
}

interface BroadcastEventTypes {
  ACTIVE_USERS: string;
  GROUP_CALL_ROOMS: string;
}
type Room = any;

const rooms: Map<string, Room> = new Map();
let peers: Participant[] = [];
let groupCallRooms: GroupCallRoom[] = [];

const broadcastEventTypes: BroadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

export const socket = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", // Update this in production to restrict origins
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("New user connected:", socket.id);

    socket.emit("connection", { socketId: socket.id });

    socket.on(
      "register-new-user",
      (data: { username: string; socketId: string }) => {
        const { username, socketId } = data;
        peers.push({ username, socketId });
        io.emit("active-users", { activeUsers: peers });
        io.emit("group-call-rooms", { groupCallRooms });
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      peers = peers.filter((peer) => peer.socketId !== socket.id);
      io.emit("active-users", { activeUsers: peers });

      groupCallRooms = groupCallRooms.filter((room) => {
        if (room.socketId === socket.id) {
          io.to(room.roomId).emit("group-call-closed", { roomId: room.roomId });
          return false;
        }
        return true;
      });
      io.emit("group-call-rooms", { groupCallRooms });

      groupCallRooms.forEach((room) => {
        socket.leave(room.roomId);
        io.to(room.roomId).emit("user-left-group-call", {
          socketId: socket.id,
        });
      });
    });

    socket.on(
      "pre-offer",
      (data: { calleeSocketId: string; callerUsername: string }) => {
        io.to(data.calleeSocketId).emit("pre-offer", {
          callerUsername: data.callerUsername,
          callerSocketId: socket.id,
        });
      }
    );

    socket.on(
      "pre-offer-answer",
      (data: { callerSocketId: string; answer: string }) => {
        io.to(data.callerSocketId).emit("pre-offer-answer", {
          answer: data.answer,
        });
      }
    );

    socket.on(
      "webRTC-offer",
      (data: { calleeSocketId: string; offer: any }) => {
        io.to(data.calleeSocketId).emit("webRTC-offer", { offer: data.offer });
      }
    );

    socket.on(
      "webRTC-answer",
      (data: { callerSocketId: string; answer: any }) => {
        io.to(data.callerSocketId).emit("webRTC-answer", {
          answer: data.answer,
        });
      }
    );

    socket.on(
      "webRTC-candidate",
      (data: { connectedUserSocketId: string; candidate: any }) => {
        io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
          candidate: data.candidate,
        });
      }
    );

    socket.on("user-hanged-up", (data: { connectedUserSocketId: string }) => {
      io.to(data.connectedUserSocketId).emit("user-hanged-up");
    });

    socket.on(
      "group-call-register",
      (data: { peerId: string; username: string; roomId: string }) => {
        socket.join(data.roomId);
        console.log(data.roomId, "room id");
         console.log(
           `Room ${data.roomId} has ${rooms.size} users rooms[data.roomId]`
         );


        const newGroupCallRoom: GroupCallRoom = {
          peerId: data.peerId,
          hostName: data.username,
          socketId: socket.id,
          roomId: data.roomId,
        };

        groupCallRooms.push(newGroupCallRoom);
        io.emit("group-call-rooms", { groupCallRooms });
      }
    );

    socket.on(
      "group-call-join-request",
      (data: { roomId: string; peerId: string; streamId: string }) => {
        socket.join(data.roomId);
        io.to(data.roomId).emit("group-call-join-request", {
          peerId: data.peerId,
          streamId: data.streamId,
        });
      }
    );

    socket.on(
      "group-call-user-left",
      (data: { roomId: string; streamId: string }) => {
        socket.leave(data.roomId);
        io.to(data.roomId).emit("group-call-user-left", {
          streamId: data.streamId,
        });
      }
    );

    socket.on("group-call-closed-by-host", (data: { peerId: string }) => {
      groupCallRooms = groupCallRooms.filter((room) => {
        if (room.peerId === data.peerId) {
          io.to(room.roomId).emit("group-call-closed", { roomId: room.roomId });
          return false;
        }
        return true;
      });
      io.emit("group-call-rooms", { groupCallRooms });
    });
  });

  console.log("Socket.IO server initialized.");
};

//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket: Socket) => {
//     console.log("New client connected:", socket.id);

//     socket.on("create-room", (roomId: string, userId: string) => {
//       if (!rooms.has(roomId)) {
//         rooms.set(roomId, { participants: new Map() });
//       }
//       joinRoom(socket, roomId, userId);
//     });

//  socket.on("join-room", (roomId: string,userId:string) => {
//    if (!rooms.has(roomId)) {
//      socket.emit("room-not-found");
//      return;
//    }

//    joinRoom(socket, roomId, userId);
//    socket.emit("room-joined", { roomId, userId }); // Send userId back
//  });

//     socket.on(
//       "webrtc-signal",
//       (data: { type: string; signal: any; to: string; from: string }) => {
//         const room = findRoomBySocketId(socket.id);
//         console.log(
//           `Received ${data.type} signal from ${data.from} to ${data.to}`
//         );
//         if (room) {
//           const targetSocket = io.sockets.sockets.get(
//             room.participants.get(data.to) || ""
//           );
//           if (targetSocket) {
//             targetSocket.emit("webrtc-signal", { ...data, from: data.from });
//           }
//         }
//       }
//     );

//     socket.on("disconnect", () => {
//       const room = findRoomBySocketId(socket.id);
//       if (room) {
//         const userId = Array.from(room.participants.entries()).find(
//           ([_, socketId]) => socketId === socket.id
//         )?.[0];
//         if (userId) {
//           room.participants.delete(userId);
//           socket
//             .to(
//               Array.from(rooms.keys()).find((key) => rooms.get(key) === room) ||
//                 ""
//             )
//             .emit("user-disconnected", userId);
//           if (room.participants.size === 0) {
//             rooms.delete(
//               Array.from(rooms.keys()).find((key) => rooms.get(key) === room) ||
//                 ""
//             );
//           }
//         }
//       }
//     });
//   });

//   function joinRoom(socket: Socket, roomId: string, userId: string) {
//     const room = rooms.get(roomId);
//     if (room && room.participants.size < 4) {
//       room.participants.set(userId, socket.id);
//       socket.join(roomId);
//       socket.emit("room-joined", { roomId, userId });
//       socket.to(roomId).emit("user-connected", userId);

//       // Send list of existing participants to the new user
//       const existingParticipants = Array.from(room.participants.keys()).filter(
//         (id) => id !== userId
//       );
//       socket.emit("existing-participants", existingParticipants);
//       console.log(`${room.participants.size} size`);
//       console.log(`User ${userId} joined room ${roomId}`);
//       console.log(`Existing participants: ${existingParticipants}`);
//     } else {
//       socket.emit("room-full");
//     }
//   }

//   function findRoomBySocketId(socketId: string): Room | undefined {
//     for (const room of rooms.values()) {
//       if (Array.from(room.participants.values()).includes(socketId)) {
//         return room;
//       }
//     }
//     return undefined;
//   }

//   return io;
// };
//   const rooms = new Map<string, Set<string>>();

//   io.on("connection", (socket: Socket) => {
//     console.log("New connection:", socket.id);
//       socket.on("user-connected", (userId: string) => {
//         onlineUsers.set(userId, socket.id);
//         onlineUsersList = Array.from(onlineUsers.entries()).map(
//           ([userId, socketId]) => ({ userId, socketId })
//         );
//         io.emit("update-online-users", onlineUsersList);
//       });

//   socket.on("join-room", (roomId: string) => {
// //   socket.join(roomId);
//  if (users[roomID]) {
//             const length = users[roomID].length;
//             if (length === 4) {
//                 socket.emit("room full");
//                 return;
//             }
//             users[roomID].push(socket.id);
//         } else {
//             users[roomID] = [socket.id];
//         }
//         socketToRoom[socket.id] = roomID;
//         const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
//          socket.emit("all users", usersInThisRoom);
//   console.log(`Socket ${socket.id} joined room ${roomId}`);

//   if (!rooms.has(roomId)) {
//     rooms.set(roomId, new Set());
//   }
//   rooms.get(roomId)?.add(socket.id);
//   console.log(rooms.size,'roomsize')

//   // Send the list of users in the room to the newly joined user
//   const usersInRoom = Array.from(rooms.get(roomId) || []);
//   socket.emit("users-in-room", usersInRoom);

//   // Notify other users in the room that a new user has joined
//   socket.to(roomId).emit("user-joined", socket.id);

//     socket.on("interviewer-joined", (roomId: string) => {
//       console.log(`Interviewer ${socket.id} joined room ${roomId}`);
//       socket.to(roomId).emit("interviewer-joined", socket.id);
//     });

//     socket.on("interviewee-joined", (roomId: string) => {
//       console.log(`Interviewee ${socket.id} joined room ${roomId}`);
//       socket.to(roomId).emit("interviewee-joined", socket.id);
//     });

//     socket.on("webrtc-offer", ({ offer, uniqueId, peerId }) => {
//   console.log(`Received offer from ${socket.id} for peer ${peerId} in room ${uniqueId}`);
//   socket.to(peerId).emit("webrtc-offer", offer, socket.id);
// });

// socket.on("webrtc-answer", ({ answer, uniqueId, peerId }) => {
//   console.log(`Received answer from ${socket.id} for peer ${peerId} in room ${uniqueId}`);
//   socket.to(peerId).emit("webrtc-answer", answer, socket.id);
// });

//     socket.on("webrtc-ice-candidate", ({ candidate, uniqueId, peerId }) => {
//       console.log(
//         `Received ICE candidate from ${socket.id} for peer ${peerId} in room ${uniqueId}`
//       );
//       socket
//         .to(uniqueId)
//         .emit("webrtc-ice-candidate", { candidate, peerId: socket.id });
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//         // // Remove the disconnected user from all rooms
//         rooms.forEach((users, roomId) => {
//           if (users.has(socket.id)) {
//             users.delete(socket.id);
//             socket.to(roomId).emit("user-left", socket.id);
//             if (users.size === 0) {
//               rooms.delete(roomId);
//             }
//           }
//         });
//         onlineUsers.forEach((socketId, userId) => {
//           if (socketId === socket.id) {
//             onlineUsers.delete(userId);
//             onlineUsersList = Array.from(onlineUsers.entries()).map(
//               ([userId, socketId]) => ({ userId, socketId })
//             );
//             io.emit("update-online-users", onlineUsersList);
//           }
//         });
//     });
//   });
