import Categoria from "../models/Categoria.js";
import {Grupo} from "../models/index.js";
import {userInSession} from "../helpers/UserInSession.js";

const formNuevoGrupo = async (req, res) => {
    const categoriasFindAll = await Categoria.findAll();
    res.render("admin/grupos/formNuevoGrupo", {
        nombrePagina: "Crea un Nuevo Grupo",
        csrf: req.csrfToken(),
        categorias: categoriasFindAll
    });
}

const saveGrupo = async (req, res) => {
    const {nombre, descripcion, categoria, url} = req.body;
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);

    try {
        const grupoSave = await Grupo.create({
            nombre: nombre,
            descripcion,
            categoria_id: categoria,
            usuario_id: usuarioEnSesion,
            url
        });
        const response = {
            msg: "Grupo creado correctamente"
        }
        return res.status(200).json(response);
    }catch(err) {
        const response = {
            msg: "Error en creacion de grupo",
            error: err.message
        }
        return res.status(500).json(response);
    }
}

export {
    formNuevoGrupo,
    saveGrupo
}