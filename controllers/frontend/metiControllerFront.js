import Meeti from "../../models/Meeti.js";
import {Grupo, Usuario} from "../../models/index.js";
import moment from "moment/moment.js";
import dotenv from "dotenv";
import {userInSession} from "../../helpers/UserInSession.js";
import {response} from "express";

dotenv.config();

const muestraMeeti = async (req, res) => {
    const cookieToken = req.cookies.token_meeti;
    const usuarioEnSesion = cookieToken ? userInSession(req.cookies.token_meeti) : null;
    const idMeeti = req.params.id;

    const meeti = await Meeti.findOne({
        where: {
            id: idMeeti
        },
        include: [
            {model: Usuario, attributes: ["id", "nombre", "imagen"]},
            {model: Grupo, attributes: ["id", "nombre", "imagen"]}
        ]
    });
    if (!meeti) {
        res.redirect("/")
    }
    let asistencia = false;
    let mensaje = false;
    let confirmacionLista = false;

    if (cookieToken && usuarioEnSesion) {
        if (meeti.usuario_id == usuarioEnSesion) {
            mensaje = true;
            asistencia = false;
        } else {
            if (meeti.interesados.includes(usuarioEnSesion)) {
                confirmacionLista = true;
            }
            asistencia = true;
        }
    } else {
        asistencia = false;
        mensaje = false;
    }
    res.render("frontend/meetis/detallesMeeti", {
        nombrePagina: `Meeti: ${meeti.titulo}`,
        csrf: req.csrfToken(),
        meeti,
        asistencia,
        mensaje,
        confirmacionLista,
        usuario: usuarioEnSesion,
        moment
    });
}

const confirmacionAsistencia = async (req, res) => {
    const {meetiId, usuarioId} = req.body;

    const meeti = await Meeti.findByPk(meetiId);
    const usuarioIdInt = parseInt(usuarioId);
    let interesados = meeti.interesados || [];

    try {
        if (!interesados.includes(usuarioIdInt)) {
            interesados.push(usuarioIdInt);
            meeti.interesados = interesados;
            meeti.changed('interesados', true);
            await meeti.save();
            return res.status(200).json({
                msg: "Has confirmado tu asistencia"
            })
        } else {
            return res.status(400).json({
                msg: "Ya habias confirmado tu asistencia"
            })
        }
    } catch (e) {
        return res.status(500).json({
            msg: e.message
        })
    }
}

const cancelarAsistencia = async (req, res) => {
    const {meetiId, usuarioId} = req.body;
    try{
        const meeti = await Meeti.findByPk(meetiId);
        meeti.interesados.pop(usuarioId);
        meeti.changed('interesados', true);
        await meeti.save();

        return res.status(200).json({
            msg: "Interesado eliminado"
        })
    }catch (e) {
        return res.status(500).json({
            msg: e.message
        });
    }
}

export {
    muestraMeeti,
    confirmacionAsistencia,
    cancelarAsistencia
}