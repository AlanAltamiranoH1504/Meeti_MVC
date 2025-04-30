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
    const errores = [];
    const usuarioEnSesion = await userInSession(req.cookies.token_meeti);
    /**
     * AGREGAR CONFIHURACION DE MULTER Y MIDDLEWARE DE MULTER. EN EL FORMULARIO AGREGAR EL ACTION QUE
     * UNICAMENTE SE ENCARGUE DE GUARDAR LA IMG ACTUALIZANDO EL GRUPO
     */

    if (nombre.trim() === "" || nombre == null){
        const error = {
            msg: "El nombre del grupo no puede estar vacio"
        };
        errores.push(error);
    }
    const grupoFindByNombre = await Grupo.findOne({where: {nombre}});
    if (grupoFindByNombre){
        const error = {
            msg: "Ya existe un grupo con ese nombre"
        }
        errores.push(error);
    }

    if (descripcion.trim() === "" || descripcion == null){
        const error = {
            msg: "La descripcion del grupo no puede estar vacia"
        }
        errores.push(error);
    }
    if (categoria.trim() === "" || categoria== null){
        const error = {
            msg: "La categoria del grupo no puede estar vacia"
        }
        errores.push(error);
    }

    if (errores.length > 0){
        return res.status(400).json(errores);
    }

    try {
        const grupoSave = await Grupo.create({
            nombre: nombre,
            descripcion,
            categoria_id: categoria,
            usuario_id: usuarioEnSesion,
            url
        });
        const response = {
            status: "200",
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