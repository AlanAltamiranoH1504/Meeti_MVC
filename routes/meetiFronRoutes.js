import express from "express";
const router = express.Router();
import {cancelarAsistencia, confirmacionAsistencia, muestraMeeti} from "../controllers/frontend/metiControllerFront.js";

router.get("/meeti/:id", muestraMeeti);
router.post("/meeti/confirmacion-asistencia", confirmacionAsistencia)
router.post("/meeti/cancelar-asistencia", cancelarAsistencia);

export default router;