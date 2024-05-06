import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    participents:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Message",
        default : []
    }]
}, {timestamps : true})

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;