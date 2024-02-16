import mongoose from 'mongoose'

const Message = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reciever: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, require: true}
},{timestamps: true})

export default mongoose.model('Message', Message)