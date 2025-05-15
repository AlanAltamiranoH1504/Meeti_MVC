import express from "express";
const router = express.Router();
import {
    formIniciarSesion,
    home
} from "../controllers/homeController.js";

router.get("/", home);
router.get("/iniciar-sesion", formIniciarSesion);

export default router;