import {Router} from 'express';
import Carts from '../dao/dbGestor/carts.js';

const router = Router();

const cartsGestor = new Carts();

router.get('/',async(req,res)=>{
    let carts = await cartsGestor.getAll();
    res.send({status:"Exitoso",payload:carts})
})

router.post('/', async (req,res)=>{
    const { idproduct, quantity} = req.body;
    let newCart = {
        products:[]
    }
    const result = await cartsManager.saveCart(newCart);
    res.send({ status: "Exitoso", message: "Carrito creado" })
})

export default router;


/*
let carts = [
    {
        "id":1,
        "productos":[]    
    },
    {
        "id":2,
        "productos":[]    
    },
];
*/

/*
cartRouter.get('/:cid', async (req, res) => {
    if (!fs.existsSync(PATH)) {
        res.status(400).send({ status: "error", error: "No hay carritos" })
    } else {
        const cid = req.params.cid;
        let data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data)
        const carrito = respuesta.find((carrito) => carrito.id == cid);
        if (!carrito) return res.status(404).send("No hay carrito creado con el id: "+cid);
        return res.send(carrito);
    }
})

cartRouter.get('/', async (req,res)=>{
    let limit = req.query.limit; //ruta de ejemplo http://localhost:8080/api/carts?limit=2
    if (!fs.existsSync(PATH)) {
        res.status(400).send({ status: "error", error: "No hay productos" })
    } else {
        let data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data)
        if (!limit || limit < 0) {
            res.send(respuesta)
        } else {
            let variable = respuesta.slice(0, limit)
            res.send({ status: "consulta satisfactoria", carritos: variable })
        }
    }
})

cartRouter.post('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (!fs.existsSync(PATH)) {
        res.status(400).send({ status: "Error", error: "No hay carritos creados aún" })
    } else {
        const data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data);
        if(!respuesta[cid-1]){
            res.status(400).send({ status: "Error", error: "No hay carrito creado con ese id" })
        }else{
            let producto = respuesta[cid-1].productos.find(e=>e.id==pid)
            if(producto==undefined){
                let producto = {}
                producto.id = pid;
                producto.quantity = 1 
                respuesta[cid-1].productos.push(producto)
                await fs.promises.writeFile(PATH, JSON.stringify(respuesta))
                res.send({ status: "Hecho", message: "Producto agregado al chango" })
            }else{
                producto.quantity = producto.quantity + 1 
                await fs.promises.writeFile(PATH, JSON.stringify(respuesta))
                res.send({ status: "Hecho", message: "Producto agregado al chango" })
            }
    
        }
        
    }
    
})
*/