import express from "express";
const router = express.Router();
import {
    cancelarAsistencia,
    confirmacionAsistencia,
    mostrarAsistentesMeeti,
    muestraMeeti, verificacionVisibilidadAsistentes
} from "../controllers/frontend/metiControllerFront.js";
import {informacionDueñoMeeti} from "../controllers/frontend/usuarioControllerFront.js";

router.get("/meeti/:id", muestraMeeti);
router.post("/meeti/confirmacion-asistencia", confirmacionAsistencia)
router.post("/meeti/cancelar-asistencia", cancelarAsistencia);
router.get("/asistentes/:id", mostrarAsistentesMeeti);
router.post("/verificacion", verificacionVisibilidadAsistentes);
router.get("/usuario/:id", informacionDueñoMeeti);

export default router;