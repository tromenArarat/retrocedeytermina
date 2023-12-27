import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/carts.router.js';

const app = express();

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/products/', productRouter)
app.use('/api/carts/', cartRouter)

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => {
    res.status(204);
  });

app.listen(8080, () => console.log("Al aire en 8080"))