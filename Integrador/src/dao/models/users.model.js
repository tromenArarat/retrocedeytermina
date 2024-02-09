import mongoose from 'mongoose'

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    password:{
        type: String,
        //(Hash)
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        default:"admin"
    }
});

usersSchema.pre('find',function(){
    this.populate('cart.carts')
})
usersSchema.pre('findOne',function(){
    this.populate('cart.carts')
})



export const usersModel = mongoose.model(usersCollection, usersSchema);

