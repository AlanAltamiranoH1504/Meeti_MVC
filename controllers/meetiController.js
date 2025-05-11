import {validationResult} from "express-validator";
import {userInSession} from "../helpers/UserInSession.js";
import Meeti from "../models/Meeti.js";

const findAllMetis = async (req, res) => {
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    try{
        const meetis = await Meeti.findAll({where: {usuario_id: usuarioEnSesion}});
        return res.status(200).json({
            meetis
        });
    }catch (error){
        return res.status(500).json({msg: error.message});
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
    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //Creacion de nuevo meeti
    try{
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
    }catch (error){
        return res.status(500).json({
            error: error.message
        });
    }
}

export {
    formNuevoMeeti,
    saveNuevoMeeti,
    findAllMetis
}