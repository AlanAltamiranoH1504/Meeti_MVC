import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const tokenGeneral = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

const tokenJWT = (datos) => {
    const {id, nombre, email} = datos;
    const token = jwt.sign({
        id,
        nombre
    }, process.env.JWT_SECRET,{
        expiresIn: "1d"
    });
    return token;
}
export {
    tokenGeneral,
    tokenJWT
}