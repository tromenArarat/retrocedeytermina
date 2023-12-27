//res.send({status:"succes",payload:carts})

import {Router} from 'express';
import fs from 'fs'

const PATH = "carts.json";
const cartRouter = Router();

// let carts = [
//     {
//         "id":1,
//         "productos":[]    
//     },
//     {
//         "id":2,
//         "productos":[]    
//     },
// ];

cartRouter.post('/', async (req,res)=>{
    let carr = {}
    if (!fs.existsSync(PATH)) {
        carr.id = 1;
        carr.productos = []
        await fs.promises.writeFile(PATH, JSON.stringify([carr]))
    } else {
        const data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data);
        carr.id = respuesta[respuesta.length - 1].id + 1
        carr.productos = []
        respuesta.push(carr)
        await fs.promises.writeFile(PATH, JSON.stringify(respuesta))
    }
    res.send({ status: "Hecho", message: "Carrito creado" })
})

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

export default cartRouter;