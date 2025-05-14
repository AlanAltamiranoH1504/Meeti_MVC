import {userInSession} from "../helpers/UserInSession.js";
import {Categoria, Grupo, Usuario} from "../models/index.js";

const panelDeAdministracion = async (req, res) => {
    const nombre = userInSession(req.cookies.token_meeti);
    const usuarioDatos = await Usuario.findByPk(nombre);
    const categorias = await Categoria.findAll();

    res.render("admin/panel", {
        nombrePagina: "Panel de Administracion",
        csrf: req.csrfToken(),
        usuario: nombre,
        usuarioDatos,
        categorias
    });
}

export {
    panelDeAdministracion
}