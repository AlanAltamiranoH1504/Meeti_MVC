import Usuario from "../../models/Usuario.js";
import {Grupo} from "../../models/index.js";

const informacionDueñoMeeti = async (req, res) =>{
    const usuario = await Usuario.findOne({
        where: {id: req.params.id},
        attributes: ["nombre", "descripcion", "imagen"],
        include: [
            {model: Grupo, attributes: ["id", "nombre", "descripcion", "imagen"]}
        ]
    });

    res.render("frontend/usuarios/mostrarPerfil",{
        usuario,
        nombrePagina: `Perfil Usuario: ${usuario.nombre}`,
        csrf: req.csrfToken()
    });
}

export {
    informacionDueñoMeeti
}