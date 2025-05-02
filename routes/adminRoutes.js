import express from "express";
const router = express.Router();
import {protegerRuta} from "../Middlewares/ProtegerRuta.js";
import {
    panelDeAdministracion
} from "../controllers/adminController.js";
import {
    formNuevoGrupo, saveGrupo
} from "../controllers/grupoController.js";
import upload from "../Middlewares/MulterImgs.js";

router.get("/panel-administracion", protegerRuta, panelDeAdministracion);
router.get("/nuevo-grupo", protegerRuta, formNuevoGrupo);
router.post("/save-grupo", protegerRuta, upload.none(), saveGrupo);


export default router;