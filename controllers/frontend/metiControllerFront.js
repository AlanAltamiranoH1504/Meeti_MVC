import Meeti from "../../models/Meeti.js";
import {Grupo, Usuario} from "../../models/index.js";
import moment from "moment/moment.js";
import dotenv from "dotenv";
import {userInSession} from "../../helpers/UserInSession.js";
import Comentario from "../../models/Comentario.js";

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
    let interesados = false;
    let formComentarios = false;

    if (cookieToken && usuarioEnSesion) {
        if (meeti.usuario_id == usuarioEnSesion) {
            mensaje = true;
            asistencia = false;
            interesados = true;
            formComentarios = true;
        } else {
            if (meeti.interesados.includes(usuarioEnSesion)) {
                confirmacionLista = true;
            }
            formComentarios = true;
            asistencia = true;
        }
    } else {
        asistencia = false;
        mensaje = false;
        formComentarios = false;
    }
    res.render("frontend/meetis/detallesMeeti", {
        nombrePagina: `Meeti: ${meeti.titulo}`,
        csrf: req.csrfToken(),
        meeti,
        asistencia,
        mensaje,
        confirmacionLista,
        interesados,
        formComentarios,
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
    try {
        const meeti = await Meeti.findByPk(meetiId);
        meeti.interesados.pop(usuarioId);
        meeti.changed('interesados', true);
        await meeti.save();

        return res.status(200).json({
            msg: "Interesado eliminado"
        })
    } catch (e) {
        return res.status(500).json({
            msg: e.message
        });
    }
}

const mostrarAsistentesMeeti = async (req, res) => {
    const meetiId = req.params.id;
    const meeti = await Meeti.findByPk(meetiId);

    if (!meeti) {
        return res.status(404).json({
            msg: "Meeti no encontrado"
        });
    } else {
        res.render("frontend/meetis/asistentesMeeti", {
            nombrePagina: `Asistentes de Meeti: ${meeti.titulo}`,
            csrf: req.csrfToken()
        })
    }
}

const verificacionVisibilidadAsistentes = async (req, res) => {
    const {id} = req.body;
    try {
        const meeti = await Meeti.findOne({
            where: {id},
            attributes: ["usuario_id", "interesados"]
        });
        const usarioEnSesion = userInSession(req.cookies.token_meeti);
        if (meeti.usuario_id === usarioEnSesion) {
            const {interesados} = meeti;
            const asistentes = await Usuario.findAll({
                attributes: ["nombre", "imagen", "email"],
                where: {id: interesados}
            });
            return res.status(200).json({
                asistentes
            });
        } else {
            return res.status(403).json({
                msg: "Sin credenciales"
            });
        }
    } catch (e) {
        return res.status(500).json({
            msg: e.message
        });
    }
}

const guardarComentario = async (req, res) => {
    const {comentario, meeti_id} = req.body;
    const usuario_id = userInSession(req.cookies.token_meeti);

    try{
         const comentarioGuardado = await Comentario.create({
            mensaje: comentario,
            usuario_id,
            meeti_id
        });
        return res.status(200).json({
            msg: "Comentario guardado"
        });
    }catch (e) {
        return res.status(500).json({
            msg: e.message,
            error: "Error en guardado de comentario"
        });
    }
}

export {
    muestraMeeti,
    confirmacionAsistencia,
    cancelarAsistencia,
    mostrarAsistentesMeeti,
    verificacionVisibilidadAsistentes,
    guardarComentario
}