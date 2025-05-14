import Usuario from "../models/Usuario.js";
import {userInSession} from "../helpers/UserInSession.js";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const formImagenPerfil = async (req, res) => {
    const id = userInSession(req.cookies.token_meeti);
    const usuario = await Usuario.findByPk(id);

    res.render("admin/usuarios/formEditarFotoPerfil", {
        nombrePagina: "Edita tu imagen perfil",
        csrf: req.csrfToken(),
        usuario
    });
}

const actualizarFoto = async (req, res) => {
    const imagen = req.file.filename;
    const id = userInSession(req.cookies.token_meeti);

    try {
        const usuario = await Usuario.findByPk(id);
        const nombreImagenDB = usuario.imagen;

        //Eliminiacion de img antigua
        if (nombreImagenDB == null){
            console.log("NO SE BORRA IMG POR DEFECTO")
        } else{
            const rutaImagen = path.join(__dirname, "../public/uploads/img_perfiles/", usuario.imagen);
            fs.unlink(rutaImagen, (error) =>{
                console.log("ERROR EN ELIMINACION DE IMG ANTIGUA");
            });
        }
        usuario.imagen = imagen;
        usuario.save();
        return res.status(200).json({
            msg: "Imagen guardada",
            imagen
        });
    }catch (e) {
        return res.status(500).json({
            msg: e.message
        });
    }
}

export {
    editarPerfilForm,
    updatedUsuario,
    formImagenPerfil,
    actualizarFoto
}