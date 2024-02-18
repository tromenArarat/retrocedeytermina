import { Router } from "express";
import {getBusiness,createBusiness,getBusinessById,addProduct} from '../controllers/business.controller.js'

const router = Router();

router.get('/',getBusiness);
router.post('/',createBusiness);

router.get('/:bid',getBusinessById);

//no debería ser un put?
router.post('/:bid/product',addProduct);


export default router;