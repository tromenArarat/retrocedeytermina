import mongoose, { Schema } from 'mongoose'

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product : Schema.Types.ObjectId,
                quantity : Number
            }
        ],
        default:[]
    }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;