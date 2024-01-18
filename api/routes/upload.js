import { Router } from "express";
import { cargar_archivo_csv } from "../controllers/uploadController.js";

const router = Router();

router.post("/cargar_csv", cargar_archivo_csv );

export default router;
