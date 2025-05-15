import express from "express";
import {findCategoriaById} from "../controllers/categoriaController.js";
const router = express.Router();

router.get("/categoria/:id", findCategoriaById);

export default router;