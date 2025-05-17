import {Grupo, Usuario} from "../models/index.js";
import Categoria from "../models/Categoria.js";
import Meeti from "../models/Meeti.js";
import moment from "moment";
import {Op} from "sequelize";

const findCategoriaById = async (req, res, next) => {
    const id = req.params.id;
    const fechaActual = moment().format("YYYY-MM-DD");
    const categoria = await Categoria.findOne({
        where: { id: id },
        attributes: ["id", "nombre"]
    });
    if(!categoria){
        res.redirect("/");
        return next();
    }

    const meetisPorCategoria = await Meeti.findAll({
        include: [
            {model: Grupo, where: {categoria_id: categoria.id}},
            {model: Usuario}
        ],
        where: {
            fecha: { [Op.gt]: fechaActual}
        }
    })

    res.render("areaPublica/categorias/grupoPorCategoria", {
        nombrePagina: `Grupos de Categoria: ${categoria.nombre}`,
        csrf: req.csrfToken(),
        meetis: meetisPorCategoria,
        moment
    });
}

export {
    findCategoriaById
}