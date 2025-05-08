const formNuevoMeeti = (req, res) => {
    res.render("admin/meetis/formNuevoMeeti", {
        nombrePagina: "Crear Nuevo Meeti",
        csrf: req.csrfToken()
    })
}

export {
    formNuevoMeeti
}