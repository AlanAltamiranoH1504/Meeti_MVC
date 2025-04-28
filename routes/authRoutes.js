import express from "express";
const router = express.Router();
import {
    inicio,
    home
} from "../controllers/authController.js";

router.get("/", home);
router.get("/crear-cuenta", inicio);

export default router;