/**
 * ARCHIVO DE CONFIURACION DE SERVIDOR
 * Meeti MVC - Clon de MeetUp
 * Alan Altamirano Hernandez
 * 28 de abril de 2025 -
 */

//Definicion de servidor
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto 3000");
});