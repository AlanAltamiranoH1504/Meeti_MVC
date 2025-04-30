import express from "express";
const router = express.Router();
import {protegerRuta} from "../Middlewares/ProtegerRuta.js";
import {
    panelDeAdministracion
} from "../controllers/adminController.js";
import {
    formNuevoGrupo, saveGrupo
} from "../controllers/grupoController.js";

router.get("/panel-administracion", protegerRuta, panelDeAdministracion);
router.get("/nuevo-grupo", protegerRuta, formNuevoGrupo);
router.post("/save-grupo", protegerRuta, saveGrupo);


export default router;