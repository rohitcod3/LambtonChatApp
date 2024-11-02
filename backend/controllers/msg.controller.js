import Message from "../models/Message.js";

export const NewMessages = async (req, res) => {

    const { courseId, userName , message} = req.body;
     try {
     const newMessage = new Message({courseId, userName, message})


     await newMessage.save();
     res.status(201).json(newMessage);
     }catch(error){
     res.status(500).json({error: 'failed to send message'})
     }

};

export const courseId = async (req, res) => {
    const {courseId} = req.params;

    try {
    const messages = await Message.find({courseId}).sort({time: 1});
    res.json(messages);
    }catch(error){
        res.status(500).json({error: 'Failed to fetch messages'})
    }
    };
    
