import { Router } from "express";
import { esAdmin } from "../middlewares/admin-rol.js";
import { tieneRol } from "../middlewares/verificar-rol.js";
import validarToken from "../middlewares/verificar-token.js";
import {
  get_convalidantes,
  get_graficos_con_filtro,
  get_nuevos_convalidados,
  get_recuperos_desercion,
  graficos_por_defecto,
} from "../controllers/graficoController.js";

const router = Router();

router.get("/graficos_por_defecto", [validarToken, tieneRol(1,2), graficos_por_defecto]);
router.post("/graficos_filtrado", [validarToken, get_graficos_con_filtro]);
router.get("/get_convalidantes", get_convalidantes);
router.get("/get_recuperos_desercion", get_recuperos_desercion);
router.get("/get_nuevos_convalidados", get_nuevos_convalidados);

export default router;
