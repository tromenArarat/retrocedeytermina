import User from '../services/userService.js'

const userService = new User();

export const getUsers = async(req,res)=>{
    let result = await userService.getUsers();
    res.send({status:'success', result});
}
export const getUserById = async(req, res)=>{
    const {uid} = req.params;
    let user = await userService.getUserById(uid);
    res.send({status:'success', result:user});
}
export const saveUser = async(req, res)=>{
    const user = req.body;
    let result = await userService.saveUser(user);
    res.send({status:'success', result:user});
}
export const updateUser = async(req,res)=>{

    res.send({status:'success', result:'updateUser'});
}