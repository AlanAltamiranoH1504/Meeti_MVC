const registro = (req, res) => {
    res.render("auth/crearCuenta", {
        nombrePagina: "Registro"
    });
}

const registroDB = (req, res) => {
    const responseJSON = {
        "mensaje": "Lllego al controlador y paso todo"
    };
    return res.status(201).json(responseJSON);
}

export {
    registro,
    registroDB
}