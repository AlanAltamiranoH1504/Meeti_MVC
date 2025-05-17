import {Categoria, Grupo, Usuario} from "../models/index.js";
import Meeti from "../models/Meeti.js";
import moment from "moment";

const home = async (req, res) => {

    const findAllCategorias = await Categoria.findAll();
    const proximosMeetis = await Meeti.findAll({
        limit: 3,
        include: [
            {model: Grupo, attributes: ["id", "nombre", "imagen"]},
            {model: Usuario, attributes: ["id", "nombre", "imagen"]}
        ],
        order: [
            ["fecha", "DESC"]
        ]
    });

    res.render("home", {
        nombrePagina: "Inicio",
        csrf: req.csrfToken(),
        categorias: findAllCategorias,
        meetis: proximosMeetis,
        moment
    });
}

const formIniciarSesion = (req, res) => {
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesión",
        csrf: req.csrfToken()
    });
}

export {
    formIniciarSesion,
    home
}