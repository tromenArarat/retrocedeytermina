import { Router } from "express";
import { getUsers, getUserById, postLogin, getLogin, getFailLogin, getRegister, postRegister, getFailRegister, getCurrent, getLogout, deleteUser , getGitHub , getGitCallback , updateUser} from '../controllers/users.controller.js'
import { passportCall, authToken, authorization } from '../utils.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get('/', getUsers);

/* LOGIN */
router.get('/login', getLogin);

router.post('/login', passportCall('login', { failureRedirect: '/faillogin' }), postLogin);

router.get('/faillogin', getFailLogin);

/* GITHUB */
router.get('/github', passportCall('github', { scope: ['user:email'] }), getGitHub); 

router.get('/githubcallback', passportCall('github', { failureRedirect: '/login' }), getGitCallback);

/* REGISTRO */
router.get('/register', getRegister);

router.post('/register', passportCall('register', { failureRedirect: '/failregister' }), postRegister);

router.get('/failregister', getFailRegister);


/* CURRENT */
router.get('/current', passportCall('jwt'), getCurrent);


/* LOGOUT */
router.get('/logout', getLogout);

router.get('/:uid', getUserById);

/* UPDATE */

router.get('/changerole/otro', passportCall("jwt", { session: false }), updateUser);

//router.put('/:uid',updateUser)


/* DELETE */
router.get('/delete/:uid', deleteUser)


export default router;