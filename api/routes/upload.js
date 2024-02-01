import { Router } from "express";
import { cargar_archivo_csv, cargar_libro_6 } from "../controllers/uploadController.js";

const router = Router();

router.post("/cargar_csv", cargar_archivo_csv );
router.post("/subir_libro_6", cargar_libro_6 );

export default router;
