import Meeti from "../../models/Meeti.js";
import {Grupo, Usuario} from "../../models/index.js";
import moment from "moment/moment.js";
import dotenv from "dotenv";
dotenv.config();

const muestraMeeti = async (req, res) =>{
    const idMeeti = req.params.id;
    const cookieToken = req.cookies.token_meeti;
    const meeti = await Meeti.findOne({
        where: {
            id: idMeeti
        },
        include: [
            {model: Usuario, attributes: ["id", "nombre", "imagen"]},
            {model: Grupo, attributes: ["id", "nombre", "imagen"]}
        ]
    });
    if (!meeti){
        res.redirect("/")
    }

    if (cookieToken){
        res.render("frontend/meetis/detallesMeeti", {
            nombrePagina: `Meeti: ${meeti.titulo}`,
            csrf: req.csrfToken(),
            meeti,
            asistencia: true,
            moment
        });
    }else {
        res.render("frontend/meetis/detallesMeeti", {
            nombrePagina: `Meeti: ${meeti.titulo}`,
            csrf: req.csrfToken(),
            meeti,
            asistencia: false,
            moment
        });
    }
}

export {
    muestraMeeti
}