import {Sequelize} from "sequelize";
import {Op} from "sequelize";
import moment from "moment";
import Meeti from "../../models/Meeti.js";
import {Grupo, Usuario} from "../../models/index.js";

const resultadosBusqueda = async (req, res) => {
    const {categoria, titulo, ciudad, pais} = req.query;

    // Verificacion de si hay busqueda por categoria
    let includeGrupo = {
        model: Grupo
    };
    if (categoria && categoria !== ""){
        includeGrupo.where = {categoria_id: categoria}
    }

    //Filtrados de Meetis
    const meetisEncontrados = await Meeti.findAll({
        where: {
            titulo: {[Op.iLike]: `%${titulo}%`},
            ciudad: {[Op.iLike]: `%${ciudad}%`},
            pais: {[Op.iLike]: `%${pais}%`},
        },
        include: [
            includeGrupo,
            {model: Usuario, attributes: ["id", "nombre", "imagen"]}
        ]
    });
    res.render("frontend/busqueda", {
        nombrePagina: "Resultados de Busqueda",
        csrf: req.csrfToken(),
        meetis: meetisEncontrados,
        moment
    });
}
export {
    resultadosBusqueda
}