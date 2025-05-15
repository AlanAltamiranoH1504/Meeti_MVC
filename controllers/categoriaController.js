import {Grupo} from "../models/index.js";
import Categoria from "../models/Categoria.js";

const findCategoriaById = async (req, res) => {
    const id = req.params.id;
    const categoria = await Categoria.findByPk(id);
    const gruposPorCategoria = await Grupo.findAll({
        where: {
            categoria_id: id
        }
    });

    res.render("areaPublica/categorias/grupoPorCategoria", {
        nombrePagina: `Grupos de Categoria: ${categoria.nombre}`,
        csrf: req.csrfToken()
    });
}

export {
    findCategoriaById
}