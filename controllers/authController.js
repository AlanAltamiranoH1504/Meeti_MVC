import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import {tokenGeneral} from "../helpers/Tokens.js";
import {confirmacionEmail} from "../helpers/Emails.js";

const registro = (req, res) => {
    res.render("auth/crearCuenta", {
        nombrePagina: "Registro",
        csrf: req.csrfToken()
    });
}

const registroDB = async (req, res) => {
    const {email, nombre, password, confirmar} = req.body;

    const usuarioExistente = await Usuario.findOne({
        where: {email: email}
    });
    const errores = [];

    if (usuarioExistente !== null && usuarioExistente !== undefined) {
        const error = {
            msg: "Ya hay un usuario registrado con ese email"
        }
        errores.push(error);
    }

    if (email.trim() === "" || email == null) {
        const error = {
            msg: "El campo de email no puede ser vacio"
        }
        errores.push(error);
    }

    if (nombre.trim() === "" || nombre == null) {
        const error = {
            msg: "El campo nombre no puede ser vacio"
        }
        errores.push(error);
    }
    if (password.trim() === "" || password == null) {
        const error = {
            msg: "El campo password no puede ser vacio"
        }
        errores.push(error);
    }
    if (password.length < 5) {
        const error = {
            msg: "La password debe ser de minimo 5 caracteres"
        }
        errores.push(error);
    }
    if (password !== confirmar) {
        const error = {
            msg: "Las passwords no coinciden"
        }
        errores.push(error);
    }

    //Validacion de array de errores
    if (errores.length >= 1) {
        const response = {
            status: 400,
            msg: "Errores en la peticion",
            errores
        }
        return res.status(400).json(response);
    } else {
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
                msg: "Usuario creado correctamente. Confirma tu cuenta en Email",
                status: 200
            }
            confirmacionEmail(nombre, email, token);
            return res.status(201).json(response);
        } catch (error) {
            const response = {
                msg: error.message,
                status: 500
            }
            return res.status(500).json(response);
        }
    }
}

const confimarCuenta = (req, res) => {
    const tokenQueryParam = req.params.token;
    res.render("auth/confirmarCuenta", {
        nombrePagina: "Confirmación de Usuario",
        csrf: req.csrfToken(),
        tokenQueryParam
    });
}

const confirmacionBack = async (req, res) => {
    const {token} = req.body;
    try {
        const usuarioFound = await Usuario.findOne({
            where: {token_usuario:token}
        });
        usuarioFound.token_usuario = null
        usuarioFound.confirmado = true;
        usuarioFound.save();
        const response = {
            status: 200,
            msg: "Cuenta confirmada correctamente",
            token
        }
        res.status(200).json(response);
    }catch (error){
        const response = {
            status: 500,
            "msg": "Error en confirmacion de usuario"
        }
        return res.status(500).json(response);
    }
}

export {
    registro,
    registroDB,
    confimarCuenta,
    confirmacionBack
}