import express from "express";
const router = express.Router();
import {
    registro,
    registroDB,
    confimarCuenta,
    confirmacionBack
} from "../controllers/authController.js";

router.get("/crear-cuenta", registro);
router.post("/crear-cuenta", registroDB);
router.get("/confirmar/:token", confimarCuenta);
router.post("/confirmacionBack", confirmacionBack)

export default router;