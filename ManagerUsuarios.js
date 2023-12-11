/*

Manager de usuarios
¿Cómo lo hacemos? Se creará una clase que 
permita gestionar usuarios usando fs.promises, 
éste deberá contar sólo con dos métodos: 
crear un usuario y consultar los usuarios 
guardados.

El Manager debe vivir en una clase en un archivo 
externo llamado ManagerUsuarios.js

El método “Crear usuario” debe recibir un objeto 
con los campos:
    Nombre
    Apellido
    Edad
    Curso

    El método debe guardar un usuario en un 
    archivo “Usuarios.json”, deben guardarlos 
    dentro de un arreglo, ya que se trabajarán 
    con múltiples usuarios

El método “ConsultarUsuarios” debe poder leer un 
archivo Usuarios.json y devolver el arreglo 
correspondiente a esos usuarios.

*/
const fs = require('fs');
const { setUncaughtExceptionCaptureCallback } = require('process');
const { stringify } = require('querystring');

const path = "Usuarios.json"

const readUsuarios = async () => {
    try {
        let data = await fs.promises.readFile('./Usuarios.json', 'utf-8');
        let resultado = JSON.parse(data)
        console.log(typeof resultado)
        return resultado
    } catch (error) {
        console.log(error)
    }
}

class ManagerUsuarios {
    constructor() {
        this.usuarios
    }
    async crearUsuario(tipejo) {
        if (!fs.existsSync(path))
            await fs.promises.writeFile(path, JSON.stringify([tipejo]))
        else {
            const data = await fs.promises.readFile(path, 'utf-8');
            const respuesta = await JSON.parse(data);
            respuesta.push(tipejo)
            await fs.promises.writeFile(path, JSON.stringify(respuesta))
        }
    }
    consultarUsuarios = async () => {
        const data = await fs.promises.readFile(path, 'utf-8');
        const respuesta = await JSON.parse(data)
        return respuesta;
    }
}

let player1 = {
    nombre: 'Gabo',
    apellido: 'Ferro',
    edad: 66,
    curso: '4to'
}

let rrpp = new ManagerUsuarios()
rrpp.crearUsuario(player1)

rrpp.consultarUsuarios().then(e => console.log(e))