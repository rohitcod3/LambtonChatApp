import express from 'express';
import { courseId} from '../controllers/msg.controller.js';
import { NewMessages } from '../controllers/msg.controller.js';

const msgRoutes = (io) => {
    const router = express.Router();
  
  
    router.post("/", (req, res) => NewMessages(req, res, io));
    router.get("/:courseId", courseId);
  
    return router;
  };
  
  export default msgRoutes;
  