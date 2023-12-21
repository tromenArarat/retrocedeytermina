
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

let frase = "hola carnalito qué chingos"

let obj = {
    frase: "frase"
}

app.get('/api/frase', (req, res) => {
    res.send({ "frase": frase })
})

app.get('/api/palabras/:pos', (req, res) => {
    let posicion = req.params.pos - 1;
    let vector = frase.split(" ");
    (vector.length >= posicion) ? 
    res.send({ "buscada": vector[posicion] }) : 
    res.status(404).send("No existe wey!");
})

app.post('/api/palabras', (req, res) => {
    let jeyEs = req.body;
    frase = frase + " " + jeyEs.palabra;
    let vector = frase.split(" ");
    res.send({ "agregada": jeyEs.palabra, 
    "posicion": vector.length });
})

app.put('/api/palabras/:pos', (req, res) => {
    let posicion = req.params.pos - 1;
    let body = req.body;
    let vector = frase.split(" ");
    let anterior = vector[posicion]
    vector[posicion] = body.palabra
    frase = vector.join(" ");
    res.send({ "actualizada": body.palabra, "anterior": anterior })
})

app.delete('/api/palabras/:pos', (req, res) => {
    let posicion = req.params.pos - 1
    let vector = frase.split(" ");
    vector.splice(posicion,1)
    //vector = vector.filter((e, i) => i != posicion)
    frase = vector.join(" ");
    res.send({ "frase": frase })
})

app.listen(8080, () => console.log("Al aire en 8080"))

