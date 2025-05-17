import express from "express";
const router = express.Router();
import {
    cancelarAsistencia,
    confirmacionAsistencia,
    mostrarAsistentesMeeti,
    muestraMeeti, verificacionVisibilidadAsistentes
} from "../controllers/frontend/metiControllerFront.js";

router.get("/meeti/:id", muestraMeeti);
router.post("/meeti/confirmacion-asistencia", confirmacionAsistencia)
router.post("/meeti/cancelar-asistencia", cancelarAsistencia);
router.get("/asistentes/:id", mostrarAsistentesMeeti);
router.post("/verificacion", verificacionVisibilidadAsistentes);

export default router;