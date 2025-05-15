import express from "express";
const router = express.Router();
import {muestraMeeti} from "../controllers/frontend/metiControllerFront.js";

router.get("/meeti/:id", muestraMeeti);

export default router;