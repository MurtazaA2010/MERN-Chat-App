import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find or create conversation
        let conversation = await Conversation.findOne({
            participents: { $all: [receiverId, senderId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participents: [receiverId, senderId],
                messages: [] // Ensure messages array is initialized
            });
        }

        // Create new message
        const newMessage = new Message({
            senderId,
            recieverId: receiverId, // Corrected typo here
            message
        });

        // Push new message to conversation
        conversation.messages.push(newMessage);

        // Save conversation
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Errordd' });
    }
};

export const getMessage = async(req,res) => {
    try {
        const  {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await conversation.findOne({
            participents: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if(!conversation){
            res.status(200).json([])
        }
        res.status(200).json(conversation.messages)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Errordd' });
    }
}