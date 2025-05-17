import express from "express";
const router = express.Router();
import {confirmacionAsistencia, muestraMeeti} from "../controllers/frontend/metiControllerFront.js";

router.get("/meeti/:id", muestraMeeti);
router.post("/meeti/confirmacion-asistencia", confirmacionAsistencia)

export default router;