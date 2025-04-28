import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import {tokenGeneral} from "../helpers/Tokens.js";

const registro = (req, res) => {
    res.render("auth/crearCuenta", {
        nombrePagina: "Registro",
        csrf: req.csrfToken()
    });
}

const registroDB = async (req, res) => {
    const {email, nombre, password, confimarPassword} = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const token = tokenGeneral();
        const usuarioSave = await Usuario.create({
            email,
            nombre,
            password: passwordHash,
            token_usuario: token
        });
        const response = {
            msg: "Usuario creado correctamente",
            status: 200
        }
        return res.status(201).json(response);
    }catch (error){
        const response = {
            msg: error.message,
            status: 500
        }
        return res.status(500).json(response);
    }
}

export {
    registro,
    registroDB
}