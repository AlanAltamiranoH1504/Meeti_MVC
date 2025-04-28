/**
 * ARCHIVO DE CONFIURACION DE SERVIDOR
 * Meeti MVC - Clon de MeetUp
 * Alan Altamirano Hernandez
 * 28 de abril de 2025 -
 */
import express from 'express';
import expressLayouts from "express-ejs-layouts"
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

//Definicion de servidor
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

//Definicion de EJS como Template engine
app.use(expressLayouts)
app.set("view engine", "ejs");
app.set("views", "./views");

//Habilitacion de carpeta y archivos public
app.use(express.static(path.join(__dirname, "public")));

//Rutas para auth
app.use("/auth", authRoutes);