import {userInSession} from "../helpers/UserInSession.js";
const home = (req, res) => {
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesión",
        csrf: req.csrfToken()
    });
}

export {
    home
}