import express from "express";
const router = express.Router();
import {protegerRuta} from "../Middlewares/ProtegerRuta.js";
import {
    panelDeAdministracion
} from "../controllers/adminController.js";
import {
    listadoGrupos,
    formNuevoGrupo, saveGrupo, eliminarGrupo, findGrupoById, actualizacionGrupo
} from "../controllers/grupoController.js";
import {
    findAllMetis,
    formNuevoMeeti,
    saveNuevoMeeti,
    eliminarMeeti,
    findAllMeetisCompleted, formEditarMeeti, updateMeeti
} from "../controllers/meetiController.js";
import upload from "../Middlewares/MulterImgs.js";
import {requestCreateMeeti} from "../Middlewares/RequestFroms.js";

//Rutas de grupos
router.get("/panel-administracion", protegerRuta, panelDeAdministracion);
router.get("/grupos", protegerRuta, listadoGrupos);
router.get("/nuevo-grupo", protegerRuta, formNuevoGrupo);
router.post("/save-grupo", protegerRuta, upload.single("imagen"), saveGrupo);
router.post("/findById", protegerRuta, findGrupoById);
router.post("/actualizacion", protegerRuta, upload.single("imagen"), actualizacionGrupo);
router.delete("/eliminar", protegerRuta, eliminarGrupo);

//Rutas de meetis
router.get("/findAllMeetis", protegerRuta, findAllMetis)
router.get("/findAllMeetis-completed", protegerRuta, findAllMeetisCompleted);
router.get("/nuevo-meeti", protegerRuta, formNuevoMeeti);
router.post("/nuevo-meeti", protegerRuta, requestCreateMeeti, saveNuevoMeeti);
router.get("/editar-meeti/:id", protegerRuta, formEditarMeeti);
router.post("/update-meeti", protegerRuta, requestCreateMeeti, updateMeeti);
router.delete("/delete-meeti", protegerRuta, eliminarMeeti);


export default router;