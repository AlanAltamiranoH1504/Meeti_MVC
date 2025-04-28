
const home = (req, res) => {
    res.render("home");
}

const inicio = (req, res) => {
    res.render("auth/crearCuenta");
}

export {
    home,
    inicio
}