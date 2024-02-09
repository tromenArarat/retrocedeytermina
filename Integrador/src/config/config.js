import dotenv from "dotenv";
import program from "./process.js";

dotenv.config();

const environment = program.opts().mode;

dotenv.config({
    path: environment === "DESARROLLO" ? '.././.desarrollo.env' : './.production.env'
});

export default {
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    CLIENT : process.env.CLIENT,
    ID : process.env.ID,
    CLAVE : process.env.CLAVE,
    COOKIE : process.env.COOKIE,
    CONEXION : process.env.CONEXION
};