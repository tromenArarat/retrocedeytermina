import { Router } from "express";
import { getProducts, saveProduct, getProductById, putProduct, deleteProduct, getFailPost, getRegister } from '../controllers/products.controller.js';
//import passport from 'passport';
import { authorization, passportCall } from "../utils.js";
import express from 'express';

const router = Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Middleware to parse URL-encoded bodies
router.use(express.urlencoded({ extended: true }));

router.get("/", passportCall("jwt", { session: false, failureRedirect: '/api/products/nologin' }), getProducts)

router.get('/nologin', getProducts);

router.get('/:pid', getProductById);

/* Solo el admin tiene acceso a estos endpoints */

router.get('/register/product', getRegister);

router.post('/register/product', passportCall('jwt'), authorization("user"), saveProduct);
//router.post('/register/product', saveProduct);
router.get('/failpost', getFailPost);

router.put('/:pid', passportCall('jwt'), authorization("admin"), putProduct);

router.delete('/:pid', passportCall('jwt'), authorization("admin"), deleteProduct);

export default router;