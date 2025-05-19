import {Sequelize} from "sequelize";
import conexion from "../config/db.js";

//Un comentario pertence a un usuarip
//Un usuario puede tener muchos comentarios

//Varios comentarios pertenece a un meeti
//Un comentario para un Meeti

const comentario = conexion.define("comentario", {
    mensaje: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: "comentarios",
    timestamps: false
});

export default comentario;

