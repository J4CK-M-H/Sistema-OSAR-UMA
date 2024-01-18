import { Router } from "express";
import { esAdmin } from "../middlewares/admin-rol.js";
import { tieneRol } from "../middlewares/verificar-rol.js";
import validarToken from "../middlewares/verificar-token.js";
import { estudiantesMatriculados } from "../controllers/graficoController.js";

const router = Router();

router.post("/get_matriculados", [
  // validarToken,
  // tieneRol(1,2),
  estudiantesMatriculados
]);

export default router;
