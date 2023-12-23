import {Router} from 'express';
import {uploader} from '../utils.js'

const userRouter = Router();

let users = [];

userRouter.get('/',(req,res)=>{
    res.send(users)
})

userRouter.get('/:index', (req, res) => {
    const index  = req.params.index;
    const user = users.find((user) => user.index == index);
    if (!user) return res.status(404).send();
    return res.send(user);
})

userRouter.post('/',uploader.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send({status:"error",error:"No se pudo guardar la imagen"})
    }
    let user = req.body
    user.profile = req.file.path;
    user.index = users.length;
    users.push(user);
    res.send({status:"succes",message:"User created"})
})

userRouter.put('/:index',(req,res)=>{
    let userNuevo = req.body;
    let index = req.params.index;
    let user = userNuevo;
    users.splice(index,1);
    users.push(user);
    res.send("Usuario modificado correctamente, ahora está en la posición"+user.index)
})

export default userRouter;