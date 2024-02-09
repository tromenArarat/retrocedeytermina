import {Router} from 'express';
import Products from '../dao/dbGestor/products.js';

const router = Router();

const productsGestor = new Products();

router.get('/',async(req,res)=>{
    let products = await productsGestor.getAll();
    //res.send({status:"Exitoso",payload:products})
    res.render("products",{data:products})
})

router.post('/', async (req,res)=>{
    const newnew = req.body;
    const result = await productsGestor.saveProduct(newnew);
    res.send({ status: "Exitoso", message: "Producto creado" })
})

router.delete('/:pid', async (req, res) => {
    let {pid} = req.params;
    let result = await productsGestor.deleteOne({_id:pid});
    res.send({status:"succes",payloads:result})
})

export default router;