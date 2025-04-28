import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const conexion = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: "localhost",
    port:5432,
    dialect: "postgres"
});
export default conexion;