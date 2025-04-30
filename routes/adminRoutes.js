import express from "express";
const router = express.Router();
import {protegerRuta} from "../Middlewares/ProtegerRuta.js";
import {
    panelDeAdministracion
} from "../controllers/adminController.js";

router.get("/panel-administracion", protegerRuta, panelDeAdministracion);


export default router;