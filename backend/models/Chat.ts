import mongoose from "mongoose";

const Chat = new mongoose.Schema({
    lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    users:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

export default mongoose.model('Chat',Chat)