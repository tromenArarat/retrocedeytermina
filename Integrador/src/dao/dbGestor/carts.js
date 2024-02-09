import cartModel from '../models/cart.model.js'

export default class Carts {
    constructor() {
        console.log(`Trabajando en << carts >> con base de datos persistiendo en MongoDB`)
    }
    getAll = async () => {
        let carts = await cartModel.find();
        return carts.map(cart=>cart.toObject())
    }
    saveCart = async (cart) => {
        let result = await cartModel.create(cart);
        return result;
    }
}