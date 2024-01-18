import { Router } from "express";
import {
  editar_estado,
  editar_usuario,
  eliminar_usuario,
  obtenerUsuarios,
} from "../controllers/usuarioController.js";
import { esAdmin } from "../middlewares/admin-rol.js";
import { tieneRol } from "../middlewares/verificar-rol.js";
import validarToken from "../middlewares/verificar-token.js";

const router = Router();

router.get("/get_usuarios", [validarToken, tieneRol(1, 2), obtenerUsuarios]);
router.put("/cambiar_estado/:estado", editar_estado);
router.put("/editar_usuario/:idusuario", editar_usuario);
router.delete("/eliminar_usuario/:idusuario", eliminar_usuario);

export default router;
