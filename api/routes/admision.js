import { Router } from "express";
import {
  checking_admision,
  get_descuentos_modalidades,
  get_user_by_id,
  update_ch_djsecu,
  update_ch_edni,
  update_ch_p_cuota,
  update_ch_p_matricula,
  update_ch_secu,
  update_dj1,
  validado_by_id,
  validar_estudiante,
} from "../controllers/admisionController.js";

const router = Router();

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

export default router;
