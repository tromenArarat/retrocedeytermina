import {Router} from 'express';
import {uploader} from '../utils.js'

const petsRouter = Router();

let pets = [];

petsRouter.get('/',(req,res)=>{
    res.send(pets)
})

petsRouter.get('/:index', (req, res) => {
    const index  = req.params.index;
    const pet = pets.find((pet) => pet.index == index);
    if (!pet) return res.status(404).send();
    return res.send(pet);
})

petsRouter.post('/',uploader.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send({status:"error",error:"No se pudo guardar la imagen"})
    }
    let pet = req.body
    pet.profile = req.file.path;
    pet.index = pets.length;
    pets.push(pet);
    res.send({status:"succes",message:"pet created"})
})

petsRouter.put('/:index',(req,res)=>{
    let petNuevo = req.body;
    let index = req.params.index;
    let pet = petNuevo;
    pets.splice(index,1);
    pets.push(pet);
    res.send("Usuario modificado correctamente, ahora está en la posición"+pets.index)
})

export default petsRouter;