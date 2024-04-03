import express, { urlencoded }  from "express";
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
//import jwt from 'jsonwebtoken';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import mongoose from "mongoose";
import router from "./routes/index.js";
//import cors from 'cors';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import session from 'express-session'

dotenv.config();

//console.log(process.env)

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/views'))

app.use(session({secret:process.env.SECRET_OR_KEY,
resave:false,
saveUninitialized:false}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const connection = mongoose.connect(process.env.MONGO)

//app.use(cors({origin:'http://localhost:5500',methods:['GET','POST','PUT']}));

//Routers
app.use('/api',router);

//Listen
const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`Al aire en: ${PORT}`));


