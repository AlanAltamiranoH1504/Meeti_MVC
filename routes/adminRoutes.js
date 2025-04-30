import express from "express";
const router = express.Router();
import {protegerRuta} from "../Middlewares/ProtegerRuta.js";
import {
    panelDeAdministracion
} from "../controllers/adminController.js";
import {
        formNuevoGrupo
} from "../controllers/grupoController.js";

router.get("/panel-administracion", protegerRuta, panelDeAdministracion);
router.get("/nuevo-grupo", protegerRuta, formNuevoGrupo);


export default router;