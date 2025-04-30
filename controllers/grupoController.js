import Categoria from "../models/Categoria.js";

const formNuevoGrupo = async (req, res) => {
    const categoriasFindAll = await Categoria.findAll();
    res.render("admin/grupos/formNuevoGrupo", {
        nombrePagina: "Crea un Nuevo Grupo",
        csrf: req.csrfToken(),
        categorias: categoriasFindAll
    });
}

export {
    formNuevoGrupo
}