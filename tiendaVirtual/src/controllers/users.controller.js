import User from '../services/user.service.js'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { generateToken } from "../utils.js";

dotenv.config();

const userService = new User();

export const getUsers = async (req, res) => {
    let result = await userService.getUsers();
    res.send({ status: 'success', result });
}
export const getUserById = async (req, res) => {
    const { uid } = req.params;
    let user = await userService.getUserById(uid);
    res.send({ status: 'success', result: user });
}

export const postLogin = async (req, res) => {
    let token = generateToken(req.user);
    res.cookie(process.env.COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    }).redirect('/api/products')
}
export const getGitHub = async (req, res) => {
    res.render('products');
  };
export const getGitCallback = async (req, res) => {
    res.redirect('/api/products');
  };

export const getLogin = async (req, res) => {
    res.render('login')
}
export const getFailLogin = async (req, res) => {    
  res.send({ error: 'Falló el logueo' })
}

export const getRegister = async (req, res) => {    
    res.render('register')
}

export const postRegister = async (req, res) => { 
    res.send({ status: "exitoso", message: 'Usuario registrado' })
};

export const getFailRegister = async (req, res) => {
    res.send({ error: 'Falló algo' })
};

export const getCurrent = async (req, res) => {
    res.send({ status: 'exitoso', payload: req.user })
};

export const getLogout = (req,res)=>{
    res.clearCookie(process.env.COOKIE_TOKEN).redirect('login')
};

export const updateUser = async (req, res) => {
    let user = req.user.user;
    if (user.role == "admin") {
        return res.send({ status: "error", message: 'No puedes cambiar el rol , eres admin' });
    }
    user.role = user.role == "user" ? "admin" : "user";
    const result = await userService.updateUser(user);
    const token = generateToken(user); 
    res.cookie(process.env.COOKIE_TOKEN, token, { maxAge: 60 * 60 * 1000, httpOnly: true }).status(200).send({ status: "exitoso", message: 'Rol cambiado', result });
  };

export const deleteUser = async (req, res) => {
    const { uid }  = req.params;
    await userService.deleteOne(uid)
    res.send({ status: 'muy bien', result: 'usuario borrado' });
}