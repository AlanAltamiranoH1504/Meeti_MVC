import Grupo from "../../models/Grupo.js";
import Meeti from "../../models/Meeti.js";
import moment from "moment";

const informacionGrupo = async (req, res, next) =>{
    const id = req.params.id;

    const grupo = await Grupo.findByPk(id);
    const meetis = await Meeti.findAll({
        where: {grupo_id: id},
        order: [
            ["fecha", "ASC"]
        ]
    });
    if (!grupo){
        res.redirect("/");
        return next();
    }
    res.render("frontend/grupos/mostrarGrupo",{
        nombrePagina: `Informacion Grupo: ${grupo.nombre}`,
        csrf: req.csrfToken(),
        grupo,
        moment,
        meetis
    });
}

export {
    informacionGrupo
}