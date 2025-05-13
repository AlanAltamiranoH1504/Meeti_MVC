import Usuario from "../models/Usuario.js";
import {userInSession} from "../helpers/UserInSession.js";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";

const editarPerfilForm = async (req, res) => {

    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    const usuario = await Usuario.findByPk(usuarioEnSesion);
    res.render("admin/usuarios/formEditarPerfilUsuario", {
        nombrePagina: "Edita tu perfil",
        csrf: req.csrfToken(),
        usuario
    });
}

const updatedUsuario = async (req, res) => {
    const errores = validationResult(req);
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);

    if (!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }

    try {
        const {nombre, email, descripcion, password, antiguaPassword} = req.body;
        const updatedUsuario = await Usuario.findByPk(usuarioEnSesion);
        const passwordHasheada = await bcrypt.hash(password, 10);

        const coincidenciaPasswordVieja = await bcrypt.compare(antiguaPassword, updatedUsuario.password);
        if (!coincidenciaPasswordVieja){
            return res.status(500).json({
                msg: "Password antigua erronea"
            });
        }

        updatedUsuario.nombre = nombre;
        updatedUsuario.email = email;
        updatedUsuario.password = passwordHasheada;
        updatedUsuario.descripcion = descripcion !== "" ? descripcion : null;
        await updatedUsuario.save();

        return res.status(200).json({
            msg: "Usuario actualizado!"
        });
    }catch (e) {
        return  res.status(500).json({
            msg: e.message
        })
    }
}

export {
    editarPerfilForm,
    updatedUsuario
}