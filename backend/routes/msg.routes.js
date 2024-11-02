import express from 'express';
import { courseId} from '../controllers/msg.controller.js';
import { NewMessages } from '../controllers/msg.controller.js';
const router = express.Router()


router.post("/messages", NewMessages)
router.get("/:courseId" , courseId);


export default router