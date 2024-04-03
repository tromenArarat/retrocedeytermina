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
    password: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        default: "user"
    }
});

usersSchema.pre('find',function(){
    this.populate('cart.carts')
})
usersSchema.pre('findOne',function(){
    this.populate('cart.carts')
})

const userModel = mongoose.model(usersCollection, usersSchema);

export default userModel;
