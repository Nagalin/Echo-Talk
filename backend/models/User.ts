import mongoose from 'mongoose'

const User = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true,},
    picName: {type: String, required: true}
})

export default mongoose.model('User',User)