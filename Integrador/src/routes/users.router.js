import {Router} from 'express';
import Users from '../dao/dbGestor/users.js';
import { generateToken , passportCall } from '../utils.js';
import passport from 'passport';
import config from '../config/config.js';

const router = Router();

const usersGestor = new Users();

router.get('/',async(req,res)=>{
    let users = await usersGestor.getAll();
    res.send({status:"Exitoso",payload:users})
})

router.get('/register',async(req,res)=>{
    res.render('register',{})
})
router.get('/login',async(req,res)=>{
    res.render('login',{})
})

router.post("/register", passport.authenticate("register",{ session: false }), (req, res) => {
    res.send({status: "ok"})
  });
  
router.post("/login", passport.authenticate("login", { session: false }),
    (req, res) => {
      let user = req.user;
      let token = generateToken(user);
      res.cookie(config.COOKIE, token, {
        maxAge:60*60*1000,
        httpOnly:true
    }).send({message:"Logueado"});
    }
);
  
router.put("/:cid", async (req, res) => {});
  
router.get("/current", passportCall("jwt", { session: false }),(req, res) => {
    res.send({status:"succes",payload:req.user});
    });

export default router;