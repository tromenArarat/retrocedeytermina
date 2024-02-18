import mongoose from 'mongoose';

const collection = 'Orders';
const schema = new mongoose.Schema({
    number:Number,
    business:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Business'
    },
    user:{
    type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    status:String,
    products:[],
    totalPrice:Number
})
const orderModel = mongoose.model(collection,schema);
export default orderModel;