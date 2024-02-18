import { Router } from "express";
import businessRoutes from './business.routes.js'
import ordersRoutes from './orders.routes.js'
import usersRoutes from './users.routes.js'

const router = Router();

router.use('/business',businessRoutes)
router.use('/orders',ordersRoutes)
router.use('/users',usersRoutes)

export default router;

