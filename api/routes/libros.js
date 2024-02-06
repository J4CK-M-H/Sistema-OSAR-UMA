import { Router } from "express";
import {
  alumno_filtro_libro_5,
  data_alumnos,
  data_libro_5,
  data_libro_6,
  filter_user_by_id,
  registrar_libro_5,
  registrar_libro_6,
} from "../controllers/libroController.js";
import validarToken from "../middlewares/verificar-token.js";

const router = Router();

router.get("/data_libro_5", [validarToken, data_libro_5]);
router.get("/data_libro_6", [validarToken, data_libro_6]);
router.post("/registrar_libro_5", registrar_libro_5);
router.post("/registrar_libro_6", registrar_libro_6);
router.get("/data_alumnos", [data_alumnos]);
router.post("/alumno_filtro_libro_5", alumno_filtro_libro_5);
router.post("/filter_user_by_id/:id", filter_user_by_id);

export default router;
