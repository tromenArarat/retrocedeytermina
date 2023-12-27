import {Router} from 'express';
import {uploader} from '../utils.js'
import fs from 'fs'

const productRouter = Router();
const PATH = "productos.json";

productRouter.get('/', async (req,res)=>{
    let limit = req.query.limit; //ruta de ejemplo http://localhost:8080/api/products?limit=2
    if (!fs.existsSync(PATH)) {
        res.status(400).send({ status: "error", error: "No hay productos" })
    } else {
        let data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data)
        if (!limit || limit < 0) {
            res.send(respuesta)
        } else {
            let variable = respuesta.slice(0, limit)
            res.send({ status: "consulta satisfactoria", productos: variable })
        }
    }
})
productRouter.get('/:pid', async (req, res) => {
    if (!fs.existsSync(PATH)) {
        res.status(400).send({ status: "error", error: "No hay productos" })
    } else {
        const pid = req.params.pid;
        let data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data)
        const product = respuesta.find((product) => product.id == pid);
        if (!product) return res.status(404).send("No, ese no lo traigo.");
        return res.send(product);
    }
})

productRouter.post('/', uploader.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })
    }
    let product = req.body
    product.thumbnail = req.file.path;
    if (!fs.existsSync(PATH)) {
        product.id = 1;
        await fs.promises.writeFile(PATH, JSON.stringify([product]))
    } else {
        const data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data);
        product.id = respuesta[respuesta.length - 1].id + 1
        respuesta.push(product)
        await fs.promises.writeFile(PATH, JSON.stringify(respuesta))
    }
    res.send({ status: "Hecho", message: "Producto creado" })
})

productRouter.put('/:pid', uploader.single('file'), async (req, res) => {
    if (!fs.existsSync(PATH)) {
        return res.status(400).send({ status: "error", error: "No hay productos" })
    } else {
        const pid = req.params.pid;
        let product = req.body;
        if (req.file) {
            product.thumbnail = req.file.path;
        }
        const data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data);
        let productViejo = respuesta.find(e => e.id == pid);
        if (!productViejo) {
            return res.status(400).send({ status: "error", error: `No existe ese producto con id : ${pid}` })
        }
        let productoNuevo = { ...productViejo, ...product }
        respuesta[respuesta.indexOf(productViejo)] = productoNuevo
        await fs.promises.writeFile(PATH, JSON.stringify(respuesta))
        res.send({ status: "Hecho", message: "Producto actualizado" })
    }
})

productRouter.delete('/:pid', async (req, res) => {
    if (!fs.existsSync(PATH)) {
        return res.status(400).send({ status: "error", error: "No hay productos" })
    } else {
        let pid = req.params.pid;
        const data = await fs.promises.readFile(PATH, 'utf-8');
        const respuesta = await JSON.parse(data);
        let productEliminar = respuesta.find(e => e.id == pid);
        if (!productEliminar) {
            return res.status(400).send({ status: "error", error: `No existe ese producto con id : ${pid}` })
        }
        respuesta.splice(respuesta.indexOf(productEliminar), 1)
        await fs.promises.writeFile(PATH, JSON.stringify(respuesta))
        res.send({ status: "Hecho", message: "Producto Eliminado" })
    }
})

export default productRouter;