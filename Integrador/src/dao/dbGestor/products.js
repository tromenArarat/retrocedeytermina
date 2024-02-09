import {productsModel} from '../models/product.model.js'

export default class Products {
    constructor() {
        console.log(`Trabajando en << products >> con base de datos persistiendo en MongoDB`)
    }
    getAll = async () => {
        let products = await productsModel.find().lean();
        return products
    }
    saveProduct = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }
    deleteOne = async (id) => {
        let result = await productsModel.deleteOne({_id:id});
        return result;
    }
}