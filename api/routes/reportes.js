import { Router } from "express";
import { periodo_filter, periodos_reporte, reporte_sunedu_minedu, reportes } from "../controllers/reporteController.js";
import validarToken from "../middlewares/verificar-token.js";
import { tieneRol } from "../middlewares/verificar-rol.js";
const router = Router();

router.post("/general", [validarToken, reportes]);
router.post("/reporte_sunedu_minedu", [validarToken, reporte_sunedu_minedu] );
router.post("/general-by-periodo-estado",[validarToken, periodo_filter] );
router.get("/periodos_reporte", [periodos_reporte]);

export default router;
