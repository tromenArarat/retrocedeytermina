
const express = require('express');

const ProductManager = require('./ProductManager.js');

const app = express()

const manolo = new ProductManager('productos.json');

// let producto={
// title : 'GameGear',
// description : 'Consola de videojuegos.',
// price : 230,
// thumbnail : './img/gamegear.png',
// code : 'ARf34',
// stock : 4
// }
// manolo.addProduct(producto)

app.use(express.urlencoded({extended:true}))

const usuarios = [{id: 1, nombre:'Pedro', localidad:'Mar Chiquita', genero:"M"}, {id: 2, nombre:'Ernesto', localidad:'Wilde', genero:"F"}]
/*
app.get('/',(req,res)=>{
  res.send({usuarios})
})

app.get('/:userId',(req,res)=>{
    let id = req.params.userId;
    let usuario = usuarios.find(e=>e.id==id)
    if(!usuario) return res.send({Error:"Usuario no encontradou"})
    res.send({usuario})
})

app.get('/saludo/:nombre',(req,res)=>{
    res.send(`¡Hola, ${req.params.nombre}!`)
})
app.get('/saludo/:nombre/:apellido',(req,res)=>{
    res.send(`¡Hola, ${req.params.nombre} ${req.params.apellido}!`)
})
*/
app.get('/productos',async (req,res)=>{
  let limit = req.query.limit;

  if(!limit||limit<0)return res.send(await manolo.getProducts())

  let productosFiltrados = manolo.getProducts().then(e=>{e.slice(0,limit)})
  return res.send(productosFiltrados)
})

app.get('/products/:id', async (req, res) => {

  let id = req.params.id;

  res.send(await manolo.getProductById(id))

})

app.listen(8080,()=>console.log('¡Servidor arriba en el puerto 8080!'))

/*
const http = require('http');

const server = http.createServer((req, res) => {
  // Request handling logic
});

server.listen(8080); // Server started on port 8080

// To close the server:
server.close(() => {
  console.log('Server closed');
});


*/