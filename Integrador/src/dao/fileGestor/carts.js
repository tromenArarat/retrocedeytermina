import fs from 'fs';
import __dirname from '../../utils.js';

const path = __dirname+'/carts.json'
export default class Carts{
    constructor(){
        console.log(`Trabajando con << carts >> en el archivo: ${path}`)
    }
    getAll = async() =>{
        if(fs.existsSync(path)){
            try{
                let data = await fs.promises.readFile(path,'utf8');
                return JSON.parse(data);
            }
            catch(error){
                console.log("No se pudo leer el archivo: "+error)
                return null;
            }
        }
        else{
            return [];
        }
    }
    saveCart = async(cart) =>{
        try{
            let carts = await this.getAll();
            if(carts.length===0){
                cart.id=1;
                carts.push(cart)
                await fs.promises.writeFile(path,JSON.stringify(carts,null,'\t'))
            }
            else{
                cart.id = carts[carts.length-1].id+1;
                carts.push(cart);
                await fs.promises.writeFile(path,JSON.stringify(carts,null,'\t'));
                return cart;
            }
        }
        catch(error){
            console.log("No se pudo escribir en el archivo: "+error)
            return null;
        }
    }
}