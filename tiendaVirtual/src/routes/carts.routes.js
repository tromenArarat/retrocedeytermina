import { Router } from "express";
import { getCarts, saveCart, getCartById, addProduct } from '../controllers/carts.controller.js'

const router = Router();

router.get('/', getCarts);
router.post('/', saveCart);

router.get('/:cid', getCartById);

router.post('/:cid/product/:pid', addProduct);


export default router;