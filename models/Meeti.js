import {Sequelize} from "sequelize";
import conexion from "../config/db.js";

const meeti = conexion.define("Meeti", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    invitado: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    hora: {
        type: Sequelize.TIME,
        default: null
    },
    cupo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    direccion :{
        type: Sequelize.STRING,
        allowNull: false
    },
    ciudad: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pais:  {
        type: Sequelize.STRING,
        allowNull: false
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lng: {
        type: Sequelize.STRING,
        allowNull: false
    },
    interesados: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    }
}, {
    tableName: "meetis",
    timestamps: false
});

export default meeti;