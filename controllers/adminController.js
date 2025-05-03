import {userInSession} from "../helpers/UserInSession.js";
import {Categoria, Grupo} from "../models/index.js";

const panelDeAdministracion = async (req, res) => {
    const nombre = userInSession(req.cookies.token_meeti);
    const categorias = await Categoria.findAll();


    res.render("admin/panel", {
        nombrePagina: "Panel de Administracion",
        csrf: req.csrfToken(),
        usuario: nombre,
        categorias
    });
}

export {
    panelDeAdministracion
}