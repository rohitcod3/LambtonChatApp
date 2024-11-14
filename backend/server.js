
import dotenv from "dotenv"
dotenv.config({path: path.resolve("backend", ".env")});
import express from "express";
import cors from "cors"
import msgRoutes from "./routes/msg.routes.js"
import {connectToMongoDB} from "./db/connectToMongoDB.js";
import { initializeSocket } from "./socket.js";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));
app.use(express.json());

const distPath = "D:/HTML project/LambtonChatapp/frontend/dist";
app.use(express.static(distPath))
app.get("*", (req,res) => {
    res.sendFile(path.join(distPath, "index.html"));
})



initializeSocket(server);



app.use('/api/messages', msgRoutes)

server.listen(PORT, () => {
    connectToMongoDB()
    console.log("Static files served from:", path.join(__dirname, "frontend/dist"));
console.log("Index.html path:", path.join(__dirname, "frontend/dist", "index.html"));
    console.log("MONGO_URI:", process.env.MONGO_URI);
    return console.log(`Server Running on port ${PORT}`)
})