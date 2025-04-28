import express from "express";
const router = express.Router();
import {
    registro,
    registroDB
} from "../controllers/authController.js";

router.get("/crear-cuenta", registro);
router.post("/crear-cuenta", registroDB);

export default router;