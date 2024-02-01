import { Router } from "express";
import { data_alumnos, data_alumnos_filtrados, data_libro_5, data_libro_6, registrar_libro_6 } from "../controllers/libroController.js";

const router = Router();

router.get("/data_libro_5", data_libro_5 );
router.get("/data_libro_6", data_libro_6 );
router.post("/registrar_libro_6", registrar_libro_6 );
router.get("/data_alumnos", data_alumnos );
router.post("/data_alumnos_filtro", data_alumnos_filtrados );

export default router;
