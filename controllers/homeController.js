const home = (req, res) => {
    res.render("home", {
        nombrePagina: "Inicio"
    });
}

export {
    home
}