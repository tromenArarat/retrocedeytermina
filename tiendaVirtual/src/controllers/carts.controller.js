import Cart from '../services/cart.service.js'
import Product from '../services/product.service.js'

const cartService = new Cart();
const productService = new Product();

export const getCarts = async (req, res) => {
    let result = await cartService.getCarts();
    res.send({ status: 'success', result });
}
export const getCartById = async (req, res) => {
    const { cid } = req.params;
    let cart = await cartService.getCartById(cid);
    res.send({ status: 'success', result: cart });
}
export const saveCart = async (req, res) => {
    const cart = req.body;
    let result = await cartService.saveCart(cart);
    res.send({ status: 'success', result: cart });
}
/*
export const addProduct = async (req, res) => {
    const { cid, pid } = req.params;
    let cart = await cartService.getCartById(cid);
    let product = await productService.getProductById(pid);
    console.log(cart + " " + product)
    if (!cart || !product) {
        return res.send({ status: 'error' })
    } else {
        if(cart.productos.filter(product._id)!==-1){
            cart.productos.push({product:product,quantity:1});
        };
    }

    res.send({ status: 'success', result: cart });
}
*/
export const addProduct = async (cid, pid) => {
    try {
      let cart = await this.getOne(cid);
      if (cart) {
        let products = cart[0].products || [];

        let prd = products.find((obj) => obj.product._id == pid);
        if (prd) {
          prd.quantity += 1;
        } else {
          products.push({ product: pid, quantity: 1 });
        }
        cart[0].products = products;
        await this.updateOne(cid, cart[0]);

        return { status: "ok", payload: cart[0] };
      } else {
        return { status: "error", error: "cart not found" };
      }
    } catch (error) {
      console.log(error);
    }
  };


export const updateCart = async (req, res) => {
    //falta completar
    res.send({ status: 'success', result: 'updateCart' });
}