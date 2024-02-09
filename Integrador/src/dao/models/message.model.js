import  mongoose from 'mongoose'

const messageCollection = 'message'

const messageSchema = mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    userMessage: {
        type: String,
        required: true
    }
})

const messageModel = mongoose.model(messageCollection, messageSchema);


export default messageModel;