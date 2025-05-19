import express from "express";
const router = express.Router();
import {
    cancelarAsistencia,
    confirmacionAsistencia, eliminarComentario, eliminarComentarios, guardarComentario,
    mostrarAsistentesMeeti,
    muestraMeeti, verificacionVisibilidadAsistentes
} from "../controllers/frontend/metiControllerFront.js";
import {informacionDueñoMeeti} from "../controllers/frontend/usuarioControllerFront.js";
import {informacionGrupo} from "../controllers/frontend/grupoControllerFront.js";
import {requestEliminarComentario} from "../Middlewares/RequestFroms.js";
import {resultadosBusqueda} from "../controllers/frontend/busquedaControllerFront.js";

router.get("/meeti/:id", muestraMeeti);
router.post("/meeti/confirmacion-asistencia", confirmacionAsistencia)
router.post("/meeti/cancelar-asistencia", cancelarAsistencia);
router.get("/asistentes/:id", mostrarAsistentesMeeti);
router.post("/verificacion", verificacionVisibilidadAsistentes);
router.get("/usuario/:id", informacionDueñoMeeti);
router.get("/grupo/:id", informacionGrupo);
router.post("/guardar-cometario", guardarComentario);
router.delete("/eliminar-comentario", requestEliminarComentario, eliminarComentario);
router.delete("/eliminar-comentarios", eliminarComentarios);

//Ruta de busqueda
router.get("/busqueda", resultadosBusqueda);
export default router;