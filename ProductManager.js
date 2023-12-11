const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    

    addProduct = async (producto) => {
        if (!fs.existsSync(this.path)){
            producto.id = 0;
            await fs.promises.writeFile(this.path, JSON.stringify([producto]))
        }else {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const respuesta = await JSON.parse(data);
            producto.id = respuesta.length
            respuesta.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(respuesta))
        }
    }

    getProducts = async () => {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            const respuesta = await JSON.parse(data)
            return respuesta;
    }
    
    getProductById = async (id) => {
        let data = await fs.promises.readFile(this.path, 'utf-8');
        const resultado = await JSON.parse(data)
        let obj = resultado.find(producto => producto.id == id);
        return obj ? obj : `Error no se encontró el producto ${id}`;
        
    }
    deleteProductById = async (id) => {
        let data = await fs.promises.readFile(this.path, 'utf-8');
        const devolucion = await JSON.parse(data)
        let productoFiltrado = devolucion.filter(e=>e.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(productoFiltrado), 'utf8');
    }
    updateProduct = async ({id, ...producto}) => {
        await this.deleteProductById(id);
        let data = await fs.promises.readFile(this.path, 'utf-8');
        const productosViejos = await JSON.parse(data)
        let modificados = [
            {id,...producto},
            ...productosViejos
        ]
        await fs.promises.writeFile(this.path, JSON.stringify(modificados), 'utf8');
    }
}

let manolo = new ProductManager('./productos.json');

let producto={
    title : 'GameGear',
    description : 'Consola de videojuegos.',
    price : 230,
    thumbnail : './img/gamegear.png',
    code : 'ARf34',
    stock : 4
}
let produto={
    title : 'don Satur',
    description : 'Agridulces.',
    price : 23,
    thumbnail : './img/gamegear.png',
    code : 'ARf34',
    stock : 1
}

//manolo.addProduct(produto)
//manolo.addProduct(producto)
//manolo.deleteProductById(2)
//manolo.getProductById(0).then(e=>console.log(e))

//manolo.getProducts()

manolo.updateProduct({id: 1,
    title: 'don Satur',
    description: 'Agridulces.',
    price: 2,
    thumbnail: './img/gamegear.png',
    code: 'ARf34',
    stock: 1,
})


manolo.getProducts().then(e=>console.log(e))
