import fs from 'fs';
import __dirname from '../../utils.js';

const path = __dirname+'/messages.json'
export default class Messages{
    constructor(){
        console.log(`Trabajando en << messages >> en el archivo: ${path}`)
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
    saveMessage = async(message) =>{
        try{
            let messages = await this.getAll();
            if(messages.length===0){
                message.id=1;
                messages.push(message)
                await fs.promises.writeFile(path,JSON.stringify(messages,null,'\t'))
            }
            else{
                message.id = messages[messages.length-1].id+1;
                messages.push(message);
                await fs.promises.writeFile(path,JSON.stringify(messages,null,'\t'));
                return message;
            }
        }
        catch(error){
            console.log("No se pudo escribir en el archivo: "+error)
            return null;
        }
    }
}