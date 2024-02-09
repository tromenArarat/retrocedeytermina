import {Router} from 'express';
import Carts from '../dao/dbGestor/carts.js';
import Products from '../dao/dbGestor/products.js';
import Messages from '../dao/dbGestor/messages.js';
import passport from 'passport';

const cartsGestor = new Carts();
const productsGestor = new Products();
const messagesGestor = new Messages();

const router = Router();

router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
    //res.render('home');
});

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user
    // res.redirect('home',{user:req.session.user} );
    res.send({status: "ok"})
})

export default router;