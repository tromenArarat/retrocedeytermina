import Business from '../services/businessService.js'

const businessService = new Business();

export const getBusiness = async(req,res)=>{
    let result = await businessService.getBusiness();
    if(!result) return res.status(500).send({status:"error",error:"Algo salió mal, intentalo de nuevo"})
    res.send({status:'success', result});
}
export const getBusinessById = async(req,res)=>{
    const {bid} = req.params;
    let result = await businessService.getBusinessById(bid);
    if(!result) return res.status(500).send({status:"error",error:"Algo salió mal, intentalo de nuevo"})
    res.send({status:'success', result: 'getBusinessById'});
}
export const createBusiness = async(req,res)=>{
    const business = req.body; //Faltan validaciones de campos
    let result = await businessService.saveBusiness(business);
    if(!result) return res.status(500).send({status:"error",error:"Algo salió mal, intentalo de nuevo"})
    res.send({status:'success',result:'createBusiness'});
}
export const addProduct = async(req, res)=>{
    let product = req.body;
    let business = await businessService.getBusinessById(req.params.bid)
    
    business.products.push(product);
    
    await businessService.updateBusiness(business._id,business);

    res.send({status:'sucess', result:'Business update'});
}