import conexion from "../config/db.js";
import {Sequelize} from "sequelize";

const categoria = conexion.define("categoria", {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    tableName: "categorias",
    timestamps: false
});

export default categoria;