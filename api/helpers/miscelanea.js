import { QueryTypes } from "sequelize";
import { connection } from "../db/database.js";

const admision_cambiar_estado_alumno = async (id) => {
  let query_validate_all_checked = `SELECT id, ch_edni,ch_dj, ch_secu, ch_djsecu, ch_p_matricula, ch_p_cuota, ch_estado_alu from checking_admision where id = ${id};`;
  let validate = await connection.query(query_validate_all_checked, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  if (
    (validate[0].ch_edni == 1 &&
      validate[0].ch_dj &&
      validate[0].ch_secu &&
      validate[0].ch_p_matricula &&
      validate[0].ch_p_cuota) ||
    (validate[0].ch_edni == 1 &&
      validate[0].ch_dj &&
      validate[0].ch_djsecu &&
      validate[0].ch_p_matricula &&
      validate[0].ch_p_cuota)
  ) {
    await connection.query(
      `UPDATE checking_admision SET ch_estado_alu = 1 WHERE id = ${id}`
    );
  } else {
    await connection.query(
      `UPDATE checking_admision SET ch_estado_alu = 0 WHERE id = ${id}`
    );
  }
};

export { admision_cambiar_estado_alumno };
