import { Router } from "express";
import { login, register, session } from "../controllers/authController.js";
import verificarToken from '../middlewares/verificar-token.js'
import { esAdmin } from "../middlewares/admin-rol.js";
import { obtenerUsuarios } from "../controllers/usuarioController.js";

const router = Router();

router.get('/session', verificarToken ,session);
router.post('/login', login);
router.get('/register', esAdmin ,register);


export default router;