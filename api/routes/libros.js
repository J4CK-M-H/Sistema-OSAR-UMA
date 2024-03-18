import { Router } from "express";
import {
  actualizar_registro_libro_6,
  alumno_filtro_libro_5,
  data_alumnos,
  data_libro_5,
  data_libro_6,
  filter_user,
  filter_user_by_id,
  registrar_libro_5,
  registrar_libro_5_sys,
  registrar_libro_6,
  test_registrar_libro_5_sys,
} from "../controllers/libroController.js";
import validarToken from "../middlewares/verificar-token.js";
import { check } from "express-validator";
import { validarCampos, validarFechaEmision } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/data_libro_5", [validarToken, data_libro_5]);
router.get("/data_libro_6", data_libro_6);
router.get("/data_alumnos", [data_alumnos]);
router.post("/registrar_libro_5", registrar_libro_5);
router.post("/registrar_libro_6", registrar_libro_6);
router.post("/alumno_filtro_libro_5", alumno_filtro_libro_5);
router.post("/filter_user_by_id/:id", filter_user_by_id);
router.post("/filter_user_libro_5", filter_user);
router.put("/actualizar_registro_libro_6/:id", actualizar_registro_libro_6);

// V2
router.post("/registrar-libro_5-v2",[
  check('carrera','El campo carrera es obligatorio').not().isEmpty(),
  check('apellidos','El campo apellidos es obligatorio').not().isEmpty(),
  check('nombres','El nombres es obligatorio').not().isEmpty(),
  check('periodo_egreso','El periodo egreso es obligatorio').not().isEmpty(),
  check('fecha_emision','La fecha de emision es obligatorio').not().isEmpty(),
  // check('fecha_emision').custom( validarFechaEmision ),
  validarCampos
] ,registrar_libro_5_sys);

router.post("/test-registrar-libro_5-v2",[
  check('carrera','El campo carrera es obligatorio').not().isEmpty(),
  check('apellidos','El campo apellidos es obligatorio').not().isEmpty(),
  check('nombres','El nombres es obligatorio').not().isEmpty(),
  check('periodo_egreso','El periodo egreso es obligatorio').not().isEmpty(),
  check('fecha_emision','La fecha de emision es obligatorio').not().isEmpty(),
  validarCampos
] ,test_registrar_libro_5_sys);

export default router;
