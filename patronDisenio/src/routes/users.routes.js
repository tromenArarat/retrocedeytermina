import { Router } from "express";
import { getUsers,saveUser,getUserById } from "../controllers/users.controller.js";

const router = Router();

router.get('/',getUsers);
router.post('/',saveUser);
router.get('/uid',getUserById);

export default router; 
