import fs from 'fs';
import __dirname from '../../utils.js';

const path = __dirname+'/products.json'
export default class Products{
    constructor(){
        console.log(`Trabajando << en products >> en el archivo: ${path}`)
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
    saveProduct = async(product) =>{
        try{
            let products = await this.getAll();
            if(products.length===0){
                product.id=1;
                products.push(product)
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'))
            }
            else{
                product.id = products[products.length-1].id+1;
                products.push(product);
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
                return product;
            }
        }
        catch(error){
            console.log("No se pudo escribir en el archivo: "+error)
            return null;
        }
    }
}