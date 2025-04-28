const registro = (req, res) => {
    res.render("auth/crearCuenta", {
        nombrePagina: "Registro",
        csrf: req.csrfToken()
    });
}

const registroDB = (req, res) => {
    const responseJSON = {
        data: "llego",
        cuerpo: req.body
    }
    return res.status(201).json(responseJSON);
}

export {
    registro,
    registroDB
}