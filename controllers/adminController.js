import {userInSession} from "../helpers/UserInSession.js";

const panelDeAdministracion = (req, res) => {
    const nombre = userInSession(req.cookies.token_meeti);

    res.render("admin/panel", {
        nombrePagina: "Panel de Administracion",
        csrf: req.csrfToken(),
        usuario: nombre
    });
}

export {
    panelDeAdministracion
}