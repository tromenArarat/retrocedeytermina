/*
Crear un modelo Ticket el cual contará con todas las formalizaciones de 
la compra. Éste contará con los campos
Id (autogenerado por mongo)
code: String debe autogenerarse y ser único
purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
amount: Number, total de la compra.
purchaser: String, contendrá el correo del usuario asociado al carrito.
*/

import mongoose from "mongoose";

const ticketCollection = "tickets";
const ticketSchema = new mongoose.Schema({

    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type: Date
    },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String
    }
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;