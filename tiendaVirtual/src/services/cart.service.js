import cartModel from '../DAO/models/cart.model.js'

export default class Cart {

    getCarts = async () => {
        let carts = await cartModel.find();
        return carts
    }
    getCartById = async (id) => {
        try {
            let cart = await cartModel.findOne({ _id: id });
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    saveCart = async (cart) => {
        let result = await cartModel.create(cart);
        return result;
    }
    deleteOne = async (id) => {
        let result = await cartModel.deleteOne({ _id: id });
        return result;
    }
}