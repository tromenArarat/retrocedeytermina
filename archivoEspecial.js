const fs = require('fs');

const operacionAsincrona = async() =>{
    try {
        let objeto = await fs.promises.readFile('./package.json','utf-8')

        let objetoJson = JSON.stringify(objeto)
        let jsonParseado = JSON.parse(objetoJson)

        const stats = await fs.promises.stat('./package.json');
        let sizeObj = stats.size;
        
        const info = {
            contenidoStr: objetoJson,
            contenidoObj: jsonParseado,
            size: sizeObj
        }
        await fs.promises.writeFile('info.json', JSON.stringify(info))
        
    } catch {
        throw new Error("diantres")
    }
    
}

operacionAsincrona()

const leerInfo = async () => {
    const archivo = await fs.promises.readFile('./info.json')
    return JSON.parse(archivo)
}

leerInfo().then(e=>console.log(e))

/*
let objetoBase = {
    id: 8,
    nombre: 'Sereno Moreno'
}
let objetoAjson = JSON.stringify(objetoBase)

let objetoParseado = JSON.parse(objetoAjson)

console.log(objetoParseado)
*/