import Message from "./models/Message.js";
import { Server } from "socket.io";

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://lambtonchatapp.onrender.com", 
      credentials: true, 
    },
  });

  let activeUsers = new Set();

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Handle user joining the chat
    socket.on("joinChat", (userName) => {
      if (activeUsers.has(userName)) {
        socket.emit("usernameError", "Username is already taken, please choose another.");
      } else {
        activeUsers.add(userName);
        socket.userName = userName;

        socket.emit("joinedChat", "Welcome to the Chat!");
        io.emit("activeUsers", Array.from(activeUsers)); // Broadcast updated active users list
        console.log(`${userName} joined. Active Users:`, Array.from(activeUsers));
      }
    });


    // Handle user disconnect
    socket.on("disconnect", () => {
      if (socket.userName) {
        activeUsers.delete(socket.userName);
        io.emit("activeUsers", Array.from(activeUsers)); // Broadcast updated active users list
        console.log(`${socket.userName} disconnected. Active Users:`, Array.from(activeUsers));
      } else {
        console.log(`User disconnected: ${socket.id}`);
      }
    });
  });
}
