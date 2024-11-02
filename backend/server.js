
import express from "express";
// import http from "http"
import mongoose from "mongoose"
// import socketIo from "socket.io"
import cors from "cors"
import dotenv from "dotenv"

import msgRoutes from "./routes/msg.routes.js"
import {connectToMongoDB} from "./db/connectToMongoDB.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());





app.use('/api/auth', msgRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    return console.log(`Server Running on port ${PORT}`)
})