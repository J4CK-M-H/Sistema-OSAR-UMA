import { Router } from "express";
import { esAdmin } from "../middlewares/admin-rol.js";
import { tieneRol } from "../middlewares/verificar-rol.js";
import validarToken from "../middlewares/verificar-token.js";
import {
  estudiantesMatriculados,
  get_convalidantes,
  get_graficos_con_filtro,
  get_nuevos_convalidados,
  get_recuperos_desercion,
} from "../controllers/graficoController.js";

const router = Router();

router.post("/get_matriculados", [
  // validarToken,
  // tieneRol(1,2),
  estudiantesMatriculados,
]);

router.post("/graficos_con_filtro", get_graficos_con_filtro);
router.get("/get_convalidantes", get_convalidantes);
router.get("/get_recuperos_desercion", get_recuperos_desercion);
router.get("/get_nuevos_convalidados", get_nuevos_convalidados);

export default router;
