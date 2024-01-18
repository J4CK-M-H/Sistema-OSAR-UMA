import { Router } from "express";
import { periodo_filter, periodos_reporte, reporte_sunedu_minedu, reportes } from "../controllers/reporteController.js";
const router = Router();

router.post("/general", reportes);
router.post("/reporte_sunedu_minedu", reporte_sunedu_minedu);
router.post("/general-by-periodo-estado", periodo_filter);
router.get("/periodos_reporte", periodos_reporte);

export default router;
