import  productModel  from '../DAO/models/product.model.js'

export default class Product {
    
    getProducts = async () => {
        let products = await productModel.find();
        return products
    }
    getProductById = async (id) => {
        try {
            let product = await productModel.findOne({ _id: id });
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    saveProduct = async (product) => {
        let result = await productModel.create(product);
        return result;
    }
    modificate = async (id, obj) => {
        await productModel.updateOne({ _id: id }, obj);
    }
    deleteOne = async (id) => {
        let result = await productModel.deleteOne({ _id: id });
        return result;
    }
}