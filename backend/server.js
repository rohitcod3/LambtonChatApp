
import dotenv from "dotenv"
dotenv.config({path: path.resolve("backend", ".env")});
import express from "express";
import cors from "cors"
import msgRoutes from "./routes/msg.routes.js"
import {connectToMongoDB} from "./db/connectToMongoDB.js";
import { initializeSocket } from "./socket.js";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000
const io = new Server(server, { cors: { origin: ["https://lambtonchatapp.onrender.com"], credentials:true } });

const __dirname = path.resolve();

app.use(cors({
    origin: "https://lambtonchatapp.onrender.com/", 
    credentials: true 
}));
app.use(express.json());
initializeSocket(io);

app.use('/api/messages', msgRoutes(io))
// const distPath = "D:/HTML project/LambtonChatapp/frontend/dist";
const distPath = "/opt/render/project/src/frontend/dist";

app.use(express.static(distPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath,  "index.html"));
  });


server.listen(PORT, () => {
    connectToMongoDB()
    return console.log(`Server Running on port ${PORT}`)
})