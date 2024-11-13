
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import msgRoutes from "./routes/msg.routes.js"
import {connectToMongoDB} from "./db/connectToMongoDB.js";
import { initializeSocket } from "./socket.js";
import http from "http";
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000


let activeUsers = new Set();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));
app.use(express.json());

initializeSocket(server);



app.use('/api/messages', msgRoutes)

server.listen(PORT, () => {
    connectToMongoDB()
    return console.log(`Server Running on port ${PORT}`)
})