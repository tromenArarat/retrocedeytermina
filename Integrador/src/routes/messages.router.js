import {Router} from 'express';
import Message from '../dao/dbGestor/messages.js';

const router = Router();

const messagesGestor = new Message();

router.get('/',async(req,res)=>{
    let messages = await messagesGestor.getAll();
    res.send({status:"Exitoso",payload:messages})
})

router.post('/', async (req,res)=>{
    const { userId, userMessage} = req.body;
    let newMessage = {
        userId : String,
        userMessage : String
    }
    const result = await messagesGestor.saveMessage(newMessage);
    res.send({ status: "Exitoso", message: "Mensaje creado" })
})

export default router;