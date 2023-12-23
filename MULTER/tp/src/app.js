import express from 'express';
import userRouter from './routes/user.router.js';
import petsRouter from './routes/pets.router.js';

const app = express();

app.use(express.static('public'))

//Middlewares (bienes intermedios)
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//app.use('/static', express.static('public'))
app.use('/api/users/', userRouter)
app.use('/api/pets/', petsRouter)

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => {
    res.status(204);
  });

app.listen(8080, () => console.log("Al aire en 8080"))