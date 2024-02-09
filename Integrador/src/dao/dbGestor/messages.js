import messageModel from '../models/message.model.js'

export default class Messages {
    constructor() {
        console.log(`Trabajando en << messages >> con base de datos persistiendo en MongoDB`)
    }
    getAll = async () => {
        let messages = await messageModel.find();
        return messages.map(message=>message.toObject())
    }
    saveMessage = async (message) => {
        let result = await messageModel.create(message);
        return result;
    }
}