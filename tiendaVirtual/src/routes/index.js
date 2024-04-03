import { Router } from "express";
import express from "express";
import cartsRoutes from './carts.routes.js'
import productsRoutes from './products.routes.js'
import usersRoutes from './users.routes.js'

const router = Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Middleware to parse URL-encoded bodies
router.use(express.urlencoded({ extended: true }));

router.use('/carts',cartsRoutes)
router.use('/products',productsRoutes)
router.use('/users',usersRoutes)
router.use('/sessions',usersRoutes)

export default router;