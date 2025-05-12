import {validationResult} from "express-validator";
import {userInSession} from "../helpers/UserInSession.js";
import Meeti from "../models/Meeti.js";
import meeti from "../models/Meeti.js";
import {Op} from "sequelize";
import moment from "moment/moment.js";
import {Categoria, Grupo} from "../models/index.js";

const findAllMetis = async (req, res) => {
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    const nowDate = moment(new Date()).format("YYYY-MM-DD");

    try {
        const meetis = await Meeti.findAll({
            where: {
                usuario_id: usuarioEnSesion,
                fecha: {
                    [Op.gt]: nowDate
                }
            }
        });
        return res.status(200).json({
            meetis
        });
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const findAllMeetisCompleted = async (req, res) => {
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    const nowDate = moment(new Date()).format("YYYY-MM-DD");

    try {
        const meetis = await Meeti.findAll({
            where: {
                usuario_id: usuarioEnSesion,
                fecha: {
                    [Op.lt]: nowDate
                }
            }
        });
        return res.status(200).json({
            meetis
        });
    } catch (e) {
        return res.status(500).json({msg: e.message});
    }
}

const formNuevoMeeti = (req, res) => {
    res.render("admin/meetis/formNuevoMeeti", {
        nombrePagina: "Crear Nuevo Meeti",
        csrf: req.csrfToken()
    })
}

const saveNuevoMeeti = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Creacion de nuevo meeti
    try {
        const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
        const {
            titulo, grupo_id, invitado, fecha, hora, cupo, descripcion,
            direccion, ciudad, estado, pais, lat, lng
        } = req.body;

        const createdMeeti = await Meeti.create({
            titulo,
            invitado: invitado === "" ? null : invitado,
            fecha,
            hora,
            cupo: cupo === "" ? null : cupo,
            descripcion,
            direccion,
            ciudad,
            estado,
            pais,
            lat,
            lng,
            grupo_id,
            usuario_id: usuarioEnSesion
        });
        return res.status(201).json({
            msg: "Meeti creado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

const eliminarMeeti = async (req, res) => {
    const {id} = req.body;
    try {
        const deletedMeeti = await Meeti.findByPk(id);
        deletedMeeti.destroy();
        deletedMeeti.save();
        return res.status(200).json({msg: "Meeti eliminado"});
    } catch (e) {
        return res.status(500).json({msg: e.message});
    }
}

const formEditarMeeti = async (req, res) => {
    const id = req.params.id;
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    const findGrupos = await Grupo.findAll({
        where: {
            usuario_id: usuarioEnSesion
        }
    });
    const updatedMeeti = await Meeti.findByPk(id, {
        include: {
            model: Grupo, attributes: ["id", "nombre"]
        }
    });

    if (updatedMeeti.usuario_id !== usuarioEnSesion) {
        const nombre = userInSession(req.cookies.token_meeti);
        const categorias = await Categoria.findAll();
        return res.render("admin/panel", {
            nombrePagina: "Panel de Administracion",
            csrf: req.csrfToken(),
            usuario: nombre,
            categorias
        });
    }

    res.render("admin/meetis/formEditarMeeti", {
        nombrePagina: `Editar Meeti: ${updatedMeeti.titulo}`,
        csrf: req.csrfToken(),
        meeti: updatedMeeti,
        grupos: findGrupos
    });
}

export {
    formNuevoMeeti,
    saveNuevoMeeti,
    findAllMetis,
    eliminarMeeti,
    findAllMeetisCompleted,
    formEditarMeeti
}