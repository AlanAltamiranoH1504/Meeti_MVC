import express from "express";
const router = express.Router();
import {
    cancelarAsistencia,
    confirmacionAsistencia,
    mostrarAsistentesMeeti,
    muestraMeeti, verificacionVisibilidadAsistentes
} from "../controllers/frontend/metiControllerFront.js";
import {informacionDueñoMeeti} from "../controllers/frontend/usuarioControllerFront.js";
import {informacionGrupo} from "../controllers/frontend/grupoControllerFront.js";

router.get("/meeti/:id", muestraMeeti);
router.post("/meeti/confirmacion-asistencia", confirmacionAsistencia)
router.post("/meeti/cancelar-asistencia", cancelarAsistencia);
router.get("/asistentes/:id", mostrarAsistentesMeeti);
router.post("/verificacion", verificacionVisibilidadAsistentes);
router.get("/usuario/:id", informacionDueñoMeeti);
router.get("/grupo/:id", informacionGrupo);

export default router;