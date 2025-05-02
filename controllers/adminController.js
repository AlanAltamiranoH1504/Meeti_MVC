import {userInSession} from "../helpers/UserInSession.js";
import {Categoria, Grupo} from "../models/index.js";

const panelDeAdministracion = async (req, res) => {
    const nombre = userInSession(req.cookies.token_meeti);
    const findAllGrupos = await Grupo.findAll({
        include: [
            {model: Categoria, attributes:['id', 'nombre']}
        ]
    });

    res.render("admin/panel", {
        nombrePagina: "Panel de Administracion",
        csrf: req.csrfToken(),
        usuario: nombre,
        grupos: findAllGrupos
    });
}

export {
    panelDeAdministracion
}