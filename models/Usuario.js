import {Sequelize} from "sequelize";
import conexion from "../config/db.js";

const usuario = conexion.define("Usuario", {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token_usuario: {
        type: Sequelize.STRING,
        allowNull: true
    },
    confirmado: {
        type: Sequelize.BOOLEAN,
    },
    imagen: {
        type: Sequelize.STRING,
        allowNull: true
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: "usuarios",
    timestamps: false
});
export default usuario;