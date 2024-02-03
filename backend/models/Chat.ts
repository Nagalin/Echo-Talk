import mongoose from 'mongoose'

const Chat = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
},{timestamps: true})

export default mongoose.model('Chat',Chat)