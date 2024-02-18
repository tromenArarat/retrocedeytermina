import mongoose from 'mongoose';

const collection = 'Users';
const schema = new mongoose.Schema({
    name:String,
    email:String,
    role:String,
    orders:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Orders'
    }
    ]
})
const userModel = mongoose.model(collection,schema);
export default userModel;