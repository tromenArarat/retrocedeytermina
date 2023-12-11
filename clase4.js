/*
writeFileSync = Para escribir contenido en un archivo. 
Si el archivo no existe, lo crea. Si existe, lo sobreescribe.
readFileSync = Para obtener el contenido de un archivo.
appendFileSync = Para añadir contenido a un archivo. ¡No se sobreescribe!
unlinkSync = Es el “delete” de los archivos. eliminará todo el archivo, no sólo el contenido.
existsSync = Corrobora que un archivo exista!

*/

const fs = require('fs');

const operacionAsincrona = async() =>{
    await fs.promises.appendFile('./pruebini.txt','agregando esto')
}

operacionAsincrona()

/*
fs.writeFileSync('./fechaYhora.txt', new Date().toString());
if (fs.existsSync('./fechaYhora.txt'))
    console.log(fs.readFileSync('fechaYhora.txt', 'utf-8'))
else
    console.log("error")


fs.promises.appendFile('./pruebini.txt','agregando esto')
fs.writeFileSync('js/fechaHora.txt', new Date().toString());
if (fs.existsSync)
    console.log(fs.readFileSync('js/fechaHora.txt', 'utf-8'))
else
    console.log("error")


fs.writeFileSync('./pruebini.txt','esta es una pruebini',(error)=>{
    if(error) return console.log('Error al escribir archivo')
    fs.readFile('./pruebini.txt','utf-8',(error,resultado)=>{
        if(error) return console.log('Error al escribir archivo')
        console.log(resultado)
        fs.appendFile('./pruebini.txt',' Más contenido',(error)=>{
            if(error) return console.log('Error al escribir archivo')
            fs.readFile('./pruebini.txt','utf-8',(error,resultado)=>{
                if(error) return console.log('Error al escribir archivo')
                console.log(resultado)
                fs.unlink('./pruebini.txt',(error)=>{
                    if(error) return console.log('No se pudo eliminar el archivo')
                }) 
            })
        })
    })
    })
    */