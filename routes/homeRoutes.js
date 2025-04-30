import express from "express";
const router = express.Router();
import {
    home,
    panelDeAdministracion
} from "../controllers/homeController.js";
import {protegerRuta} from "../Middlewares/ProtegerRuta.js";

router.get("/", home);
router.get("/panel-administracion", protegerRuta, panelDeAdministracion);

export default router;