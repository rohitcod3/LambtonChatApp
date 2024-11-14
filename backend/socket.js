// socket.js

import { Server } from "socket.io";

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://lambtonchatapp.onrender.com/", 
      credentials: true,
    },
  });

let activeUsers = new Set();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinChat", (userName) =>{
      if (activeUsers.has(userName)){
        socket.emit("usernameError", "Username is already taken, Please choose another.");
      }else{
        activeUsers.add(userName);
        socket.userName = userName;

        socket.emit("joinedChat", "Welcome to the Chat!");

        io.emit("activeUsers", Array.from(activeUsers));
        console.log(`${userName} joined. Active Users:`, Array.from(activeUsers));
      }
    })
    // Handle incoming messages
    socket.on("sendMessage", (messageData) => {
      // Broadcast the message to all clients, including the sender
      io.emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
      if(socket.userName){
        activeUsers.delete(socket.userName);
        console.log(`${socket.userName} disconnected. Active Users:`, Array.from(activeUsers));
        io.emit("activeUsers", Array.from(activeUsers));
      }else{
        console.log("User disconnected:", socket.id);
      }
      
    });
  });
}
