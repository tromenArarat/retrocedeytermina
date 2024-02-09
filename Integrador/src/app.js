import express from 'express';
import __dirname from './utils.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import messagesRouter from './routes/messages.router.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config/config.js';


const app = express();
const PORT = 8080;
const connection = mongoose.connect(config.CONEXION)
/**
 * Template engine
 */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

/**
 * Middlewares
 */
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use(express.urlencoded({extended:true}));
//app.use('/',viewsRouter)
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/api/messages',messagesRouter);
app.use('/api/users',usersRouter);

app.use(passport.session())
app.use(session({
    secret: config.CLAVE,
    resave: false,
    saveUninitialized: false
}));
app.use('/api/sessions',viewsRouter);




const server = app.listen(PORT,()=>console.log(`Al aire en: ${PORT}`));
