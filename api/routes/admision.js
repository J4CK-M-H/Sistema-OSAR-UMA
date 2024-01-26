import { Router } from "express";
import {
  agregar_estudiante,
  agregar_proyeccion,
  borrar_proyeccion,
  buscar_proyeccion,
  cargar_carreras,
  checking_admision,
  editar_proyeccion,
  get_descuentos_modalidades,
  get_periodos,
  get_user_by_id,
  lista_admision,
  lista_proyeccion,
  obtener_carreras,
  reporte_general,
  update_ch_djsecu,
  update_ch_edni,
  update_ch_p_cuota,
  update_ch_p_matricula,
  update_ch_secu,
  update_dj1,
  update_estado_entrevista,
  update_lead,
  validado_by_id,
  validar_estudiante,
} from "../controllers/admisionController.js";

const router = Router();

// CHECKING ADMISION
router.get("/checking_admision", checking_admision);
router.put("/checking_admision/update_dj1/:id", update_dj1);
router.put("/checking_admision/update_ch_edni/:id", update_ch_edni);
router.put("/checking_admision/update_ch_secu/:id", update_ch_secu);
router.put("/checking_admision/update_ch_djsecu/:id", update_ch_djsecu);
router.put(
  "/checking_admision/update_ch_p_matricula/:id",
  update_ch_p_matricula
);
router.put("/checking_admision/update_ch_p_cuota/:id", update_ch_p_cuota);
router.post("/checking_admision/validar_estudiante", validar_estudiante);
router.post("/checking_admision/get_user_by_id/:id", get_user_by_id);
router.get("/checking_admision/get_descuentos_modalidades", get_descuentos_modalidades);
router.get("/checking_admision/validado_by_id/:id", validado_by_id);

// LISTA ADMISION
router.get("/lista_admision", lista_admision);
router.post("/lista_admision/update_estado_entrevista/:id", update_estado_entrevista);
router.post("/lista_admision/agregar_estudiante", agregar_estudiante);
router.get("/lista_admision/obtener_carreras", obtener_carreras);

// REPORTE ADMISION
router.get("/reporte_admision/get_periodos", get_periodos);
router.post("/reporte_admision/reporte_general", reporte_general);
router.post("/reporte_admision/update_lead/:id", update_lead);

// ADMINISTRACION PROYECCIÓN
router.get("/administracion_proyeccion/lista_proyeccion", lista_proyeccion);
router.get("/administracion_proyeccion/cargar_carreras", cargar_carreras);
router.post("/administracion_proyeccion/agregar_proyeccion", agregar_proyeccion);
router.post("/administracion_proyeccion/buscar_proyeccion/:id", buscar_proyeccion);
router.put("/administracion_proyeccion/editar_proyeccion/:id", editar_proyeccion);
router.delete("/administracion_proyeccion/borrar_proyeccion/:id", borrar_proyeccion);
export default router;
