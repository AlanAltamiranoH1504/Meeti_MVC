import Categoria from "../models/Categoria.js";
import {Grupo} from "../models/index.js";
import {userInSession} from "../helpers/UserInSession.js";
import * as url from "node:url";

const formNuevoGrupo = async (req, res) => {
    const categoriasFindAll = await Categoria.findAll();
    res.render("admin/grupos/formNuevoGrupo", {
        nombrePagina: "Crea un Nuevo Grupo",
        csrf: req.csrfToken(),
        categorias: categoriasFindAll
    });
}


const saveGrupo = async (req, res) => {
    const {nombre, descripcion, categorias, sitio_web} = req.body;
    const imagen = req.file.filename;
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    const errores = [];

    //Validacion de campos
    if (nombre.trim() === "" || nombre == null){
        const error = {
            msg: "El nombre del grupo no puede estar vacio"
        }
        errores.push(error);
    }
    if (descripcion.trim() === "" || descripcion == null){
        const error = {
            msg: "La descripcion del grupo no puede estar vacio"
        }
        errores.push(error);
    }
    if (categorias.trim() === "" || categorias == null){
        const error = {
            msg: "El grupo debe tener una categoria"
        }
        errores.push(error);
    }
    if (!imagen){
        const error = {
            msg: "El grupo debe tener una imagen"
        }
        errores.push(error);
    }

    const grupoFoundByNombre = await Grupo.findOne({where:{nombre}});
    if (grupoFoundByNombre){
        const error = {
            msg: "El nombre del grupo ya esta en uso"
        }
        errores.push(error);
        return res.status(400).json(errores);
    }

    if (errores.length >= 1){
        return res.status(500).json(errores);
    }

    try{
        const savedGrupo = await Grupo.create({
            nombre,
            descripcion,
            categoria_id: categorias,
            url: sitio_web,
            usuario_id: usuarioEnSesion,
            imagen
        });

        const response = {
            msg: "Grupo Guardado Correctamente",
            usuarioEnSesion
        }
        return res.status(200).json(response);
    }catch (e){
        const error = {
            msg: e.message
        }
        return res.status(500).json(error)
    }
}

export {
    formNuevoGrupo,
    saveGrupo
}