import conexion from "../config/db.js";
import {Sequelize} from "sequelize";

const grupo = conexion.define("grupo", {
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url:{
        type: Sequelize.STRING,
        allowNull: true
    },
    imagen: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    tableName: "grupos",
    timestamps: false
});

export default grupo;