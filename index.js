/**
 * ARCHIVO DE CONFIURACION DE SERVIDOR
 * Meeti MVC - Clon de MeetUp
 * Alan Altamirano Hernandez
 * 28 de abril de 2025 -
 */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

//Definicion de servidor
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

//Definicion de EJS como Template engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Habilitacion de carpeta y archivos public
app.use(express.static("/public"));

//Rutas para auth
app.use("/auth", authRoutes);