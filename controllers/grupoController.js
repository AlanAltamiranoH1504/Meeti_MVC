import Categoria from "../models/Categoria.js";
import {Grupo} from "../models/index.js";
import {userInSession} from "../helpers/UserInSession.js";
import * as url from "node:url";
import {raw} from "express";

const listadoGrupos = async (req, res) => {
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    try{
        const grupos = await Grupo.findAll({where: {usuario_id: usuarioEnSesion}});
        return res.status(200).json(grupos);
    }catch (e){
        return res.status(500).json({msg: e.message});
    }
}

const formNuevoGrupo = async (req, res) => {
    const categoriasFindAll = await Categoria.findAll();
    res.render("admin/grupos/formNuevoGrupo", {
        nombrePagina: "Crea un Nuevo Grupo",
        csrf: req.csrfToken(),
        categorias: categoriasFindAll
    });
}

const findGrupoById = async (req, res) => {
    const {id} = req.body;
    const foundedGrupo = await Grupo.findByPk(id);
    return res.status(200).json(foundedGrupo);
}

const actualizacionGrupo = async (req, res) => {
    const {idGrupo, nombre, descripcion, categorias, sitio_web} = req.body;
    const file = req.file;

    try {
        const updatedGrupo = await Grupo.findByPk(idGrupo);
        updatedGrupo.nombre = nombre;
        updatedGrupo.descripcion = descripcion;
        updatedGrupo.categoria_id = categorias;
        updatedGrupo.url = sitio_web;
        updatedGrupo.imagen = file.filename;
        await updatedGrupo.save();
        return res.status(200).json({
            msg: "Grupo Actualizado correctamente"
        });
    }catch (error){
        const response = {
            msg: error.message,
        }
        return  res.status(500).json(response);
    }
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

const eliminarGrupo = async (req, res) => {
    const {id} = req.body;
    try {
        const deletedGrupo = await Grupo.findByPk(id);
        if (!deletedGrupo) {
            const response = {
                msg: "El grupo no existe"
            }
            return res.status(404).json(response);
        }
        deletedGrupo.destroy();
        return res.status(200).json({msg: "Grupo eliminado correctamente"});
    }catch (error){
        const response = {
            msg: error.message
        }
        return res.status(500).json(response);
    }
}

export {
    listadoGrupos,
    formNuevoGrupo,
    saveGrupo,
    actualizacionGrupo,
    eliminarGrupo,
    findGrupoById
}