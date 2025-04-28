import express from "express";
const router = express.Router();
import {
    home
} from "../controllers/homeController.js";

router.get("/", home);

export default router;