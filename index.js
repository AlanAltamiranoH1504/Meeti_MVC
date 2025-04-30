/**
 * ARCHIVO DE CONFIURACION DE SERVIDOR
 * Meeti MVC - Clon de MeetUp
 * Alan Altamirano Hernandez
 * 28 de abril de 2025 -
 */
import express from 'express';
import expressLayouts from "express-ejs-layouts"
import dotenv from 'dotenv';
import createError from "http-errors";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import * as path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import conexion from "./config/db.js";

//Definicion de servidor
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

//Definicion de conexion a base de datos
try{
    conexion.authenticate();
    console.log("Conexion correcta a la base de datos")
}catch (error){
    console.log("Error en conexion a la base de datos");
    console.log(error.message);
}

//Definicion de EJS como Template engine
app.use(expressLayouts)
app.set("view engine", "ejs");
app.set("views", "./views");

//Definicion de proteccion CSRF
app.use(cookieParser());
app.use(csurf({cookie: true}));

//Habilitacion lectura de formulario
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Habilitiacion de cookies
app.use(cookieParser());

//Habilitacion de carpeta y archivos public
app.use(express.static(path.join(__dirname, "public")));

//Habilitacion de bootstrap
app.use('/static', express.static(path.join(__dirname, 'node_modules')));

//Rutas para auth
app.use("/auth", authRoutes);
app.use("/", homeRoutes);

//Ruta para errores
app.use((req, res, next) => {
    next(createError(404, "Recurso no encontrado"));
});
app.use((error, req, res, next) => {
   const errorVista = error.message;
   const status = error.status || 500;
   res.render("error", {
       errorVista,
       status
   });
});