// socket.js
import Message from "./models/Message.js";
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
    // socket.on("sendMessage", (messageData) => {
    //   io.emit("receiveMessage", messageData);
    // });

    socket.on("sendMessage", async (messageData) => {
      console.log("Message Data:", messageData);
      try {
        const { _id, ...data } = messageData;
        const message = new Message(data);
        const savedMessage = await message.save();
        io.emit("receiveMessage", savedMessage);
      } catch (error) {
        console.error("Failed to save message:", error);
      }
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
