const home = (req, res) => {
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesión",
        csrf: req.csrfToken()
    });
}

const panelDeAdministracion = (req, res) => {
    res.render("admin/panel", {
        nombrePagina: "Administracion",
        csrf: req.csrfToken()
    });
}

export {
    home,
    panelDeAdministracion
}