const registro = (req, res) => {
    res.render("auth/crearCuenta", {
        nombrePagina: "Registro"
    });
}

export {
    registro
}