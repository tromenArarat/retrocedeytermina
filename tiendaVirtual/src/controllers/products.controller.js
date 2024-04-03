import Product from '../services/product.service.js'
import productModel from '../DAO/models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

const productService = new Product();

export const getProducts = async (req, res) => {
    let limit = parseInt(req.query.limit) || 5;
    let page = parseInt(req.query.page) || 1;
    let sort = parseInt(req.query.sort) || 1;

    const products = await productModel.paginate({}, { page, limit, sort: { title: sort }, lean: true })
    products.prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : '';
    products.nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : '';
    products.isValid = !(page <= 0 || page > products.totalPages);

    products.user = req.user?.user || { first_name: "visitante" }

    res.render("products", products);
}
export const getProductById = async (req, res) => {
    const { pid } = req.params;
    let product = await productService.getProductById(pid);
    res.send({ status: 'success', result: product });
}

export const getRegister = async (req,res) => {
    res.render('productAlta')
}
export const saveProduct = async (req, res) => {
    try {

        const { title, description, code, price, status, stock, category } = await req.body;
        
        console.log(req.body)

        if (!title || !description || !code || !price || !status || !stock || !category) {
            let missingFields = [];
            if (!title) missingFields.push('title');
            if (!description) missingFields.push('description');
            if (!code) missingFields.push('code');
            if (!price) missingFields.push('price');
            if (!status) missingFields.push('status');
            if (!stock) missingFields.push('stock');
            if (!category) missingFields.push('category');
        
            return res.status(400).json({ 
                status: 'error', 
                message: `The following fields are required: ${missingFields.join(', ')}` 
            });
        }

        // Construct product data
        const productData = {
            title: title,
            description: description,
            code:code,
            price:price,
            status:status,
            stock:stock,
            category:category
        };

        // If the user is logged in and has 'user' role, set owner to user's email
        if (req.user && req.user.user.role === 'user') {
            productData.owner = req.user.user.email;
        }

        // Save the product data using productService.createOne method
        let resp = await productService.saveProduct(productData);

        // Send response with token and product data
        res.send({ status: 'ok', payload: resp });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error });
    }
}



export const getFailPost = async (req,res) => {
    res.send({ error: 'Falló algo' })
}

export const putProduct = async (req, res) => {
    try {
        let { pid } = req.params;
        let productNew = req.body;
        let prod = await productService.getOne(pid);
        if (!prod) {
            return res.status(404).send({ status: 'error', message: 'producto no encontrado' });
        }
        if (req.user.user.role == 'premium' && prod[0].owner != req.user.user.email) {
            return res.status(403).send({ status: 'error', message: 'No sos el dueño de este producto' });
        }

        let resp = await productService.modificate(pid, productNew);

        res.send({ status: 'ok', message: resp, payload: resp });
    } catch (error) {
        //req.logger.warning("No se encontró el producto")
        res.status(500).send({ status: 'error', message: error });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let { pid } = req.params;
        let prod = await productService.getOne(pid);
        if (!prod) {
            return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
        if (req.user.user.role == 'premium' && prod[0].owner != req.user.user.email) {
            return res.status(403).send({ status: 'error', message: 'No sos el dueño de este producto' });
        }
        let resp = await productService.remove(pid);
        res.send({ status: 'ok', message: resp, payload: resp });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error });
    }
}

export const updateProduct = async (req, res) => {
    //falta completar
    res.send({ status: 'success', result: 'updateProduct' });
}