import { Router } from "express";
import {
  actualizar_fecha_ingreso_egreso,
  agregar_registro,
  fechas_ingreso_egreso,
} from "../controllers/fechasController.js";
const router = Router();

router.get("/fechas_ingreso_egreso", [fechas_ingreso_egreso]);
router.post("/agregar_registro", [agregar_registro]);
router.put("/actualizar_fecha_ingreso_egreso/:id", [actualizar_fecha_ingreso_egreso]);

export default router;
