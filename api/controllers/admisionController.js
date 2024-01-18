import { request, response } from "express";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";
import { admision_cambiar_estado_alumno } from "../helpers/miscelanea.js";

const checking_admision = async (req = request, res = response) => {
  try {
    let checking_validados = `SELECT id, ch_dni, CONCAT(ch_nombres,' ', ch_apepat,' ', ch_apemat) AS ch_nombres, es.abrev, ch_validacion, ch_edni, ch_dj, ch_secu, ch_djsecu, ch_p_matricula, ch_p_cuota, ch_estado_alu FROM checking_admision INNER JOIN especialidad es ON ch_codesp = es.codesp WHERE ch_validacion = 1 ORDER BY id ASC`;

    let checking_no_validados = `SELECT id, ch_dni, CONCAT(ch_nombres,' ', ch_apepat,' ', ch_apemat) AS ch_nombres, es.abrev, ch_validacion, ch_edni, ch_dj, ch_secu, ch_djsecu, ch_p_matricula, ch_p_cuota, ch_estado_alu FROM checking_admision INNER JOIN especialidad es ON ch_codesp = es.codesp WHERE ch_validacion = 0 ORDER BY id ASC`;

    let checking_data_no_validados = await connection.query(
      checking_no_validados,
      {
        type: QueryTypes.SELECT,
        raw: false,
      }
    );

    let checking_data_validados = await connection.query(checking_validados, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    return res.status(200).json({
      validados: checking_data_validados,
      no_validados: checking_data_no_validados,
    });
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

const update_ch_edni = async (req = request, res) => {
  const { id } = req.params;
  const { ch_edni } = req.body;

  let query_update_edni = `UPDATE checking_admision SET ch_edni = ${ch_edni} WHERE id = ${id}`;
  await connection.query(query_update_edni);
  admision_cambiar_estado_alumno(id);
  return res.status(200).json("OK");
};

const update_dj1 = async (req = request, res) => {
  const { id } = req.params;
  const { ch_dj1 } = req.body;

  let query_update_dj1 = `UPDATE checking_admision SET ch_dj = ${ch_dj1} WHERE id = ${id}`;
  await connection.query(query_update_dj1);
  admision_cambiar_estado_alumno(id);
  return res.status(200).json("OK");
};

const update_ch_secu = async (req = request, res) => {
  const { id } = req.params;
  const { ch_secu } = req.body;

  let query_update_ch_secu = `UPDATE checking_admision SET ch_secu = ${ch_secu} WHERE id = ${id}`;
  await connection.query(query_update_ch_secu);
  admision_cambiar_estado_alumno(id);
  return res.status(200).json("OK");
};

const update_ch_djsecu = async (req = request, res) => {
  const { id } = req.params;
  const { ch_djsecu } = req.body;

  let query_update_ch_djsecu = `UPDATE checking_admision SET ch_djsecu = ${ch_djsecu} WHERE id = ${id}`;
  await connection.query(query_update_ch_djsecu);
  admision_cambiar_estado_alumno(id);
  return res.status(200).json("OK");
};

const update_ch_p_cuota = async (req = request, res) => {
  const { id } = req.params;
  const { ch_p_cuota } = req.body;

  let query_update_ch_p_cuota = `UPDATE checking_admision SET ch_p_cuota = ${ch_p_cuota} WHERE id = ${id}`;
  await connection.query(query_update_ch_p_cuota);
  admision_cambiar_estado_alumno(id);
  return res.status(200).json("OK");
};

const update_ch_p_matricula = async (req = request, res) => {
  const { id } = req.params;
  const { ch_p_matricula } = req.body;

  let query_update_ch_p_matricula = `UPDATE checking_admision SET ch_p_matricula = ${ch_p_matricula} WHERE id = ${id}`;
  await connection.query(query_update_ch_p_matricula);
  admision_cambiar_estado_alumno(id);
  return res.status(200).json("OK");
};

const get_user_by_id = async (req, res) => {
  let query_estudiante_by_id = `SELECT * FROM checking_admision where id = ${req.params.id}`;

  let estudiante_by_id = await connection.query(query_estudiante_by_id, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  // let query_motivo_descuento = `SELECT * FROM descuentos where codigo = 'ACT'`;
  let query_motivo_descuento = `SELECT * FROM descuentos where codigo = '${estudiante_by_id[0].o_moti_des}'`;

  let modalidad_ingreso = estudiante_by_id[0].ch_mod_ing;

  let modalidad_descuento_filter = await connection.query(
    `SELECT codigo, id, nombre FROM modalidad_ingreso where codigo = '${modalidad_ingreso}'`,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  let motivo_descuento = await connection.query(query_motivo_descuento, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  estudiante_by_id[0].objeto_descuento = motivo_descuento[0] ?? {
    Nombre: "",
    codigo: "",
  };
  estudiante_by_id[0].objeto_modalidad = modalidad_descuento_filter[0]
    ? {
        codigo: modalidad_descuento_filter[0].codigo,
        id: modalidad_descuento_filter[0].id,
        nombre: modalidad_descuento_filter[0].nombre,
      }
    : { codigo: "", id: "", nombre: "" };

  // estudiante_by_id[0].objeto_descuento = { Nombre: "", codigo: "" };
  // estudiante_by_id[0].objeto_modalidad = { codigo: "", nombre: "" };
  // console.log(estudiante_by_id[0]);
  return res.status(200).json(estudiante_by_id[0]);
};

const get_descuentos_modalidades = async (req, res) => {
  let query_descuentos = `SELECT * FROM descuentos`;
  let descuentos = await connection.query(query_descuentos, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  let query_modalidades_ingreso = `SELECT * FROM modalidad_ingreso`;
  let modalidades_ingreso = await connection.query(query_modalidades_ingreso, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json({ descuentos, modalidades_ingreso });
};

const validar_estudiante = async (req = request, res) => {
  const {
    ch_dni,
    ch_mod_ing,
    ch_turno,
    ch_nombres,
    ch_apepat,
    ch_apemat,
    ch_celular,
    ch_fecnac,
    ch_ejecutiva,
    o_moti_des,
    id,
  } = req.body;

  let query_validar_estudiante = `UPDATE checking_admision SET ch_mod_ing = '${ch_mod_ing}', ch_turno = '${ch_turno}', ch_dni = '${ch_dni}', ch_nombres = '${ch_nombres}', ch_apepat = '${ch_apepat}', ch_apemat = '${ch_apemat}', ch_celular = '${ch_celular}', ch_fecnac = '${ch_fecnac}', ch_ejecutiva = '${ch_ejecutiva}', o_moti_des = '${o_moti_des}', ch_validacion = 1 WHERE id = ${id}`;

  await connection.query(query_validar_estudiante, {
    type: QueryTypes.UPDATE,
    raw: false,
  });

  return res.status(200).json("OK");
};

const validado_by_id = async(req,res) => {
  let query_validado = `SELECT id, ch_dni, CONCAT(ch_nombres,' ', ch_apepat,' ', ch_apemat) AS ch_nombres, es.abrev, ch_validacion, ch_edni, ch_dj, ch_secu, ch_djsecu, ch_p_matricula, ch_p_cuota, ch_estado_alu FROM checking_admision INNER JOIN especialidad es ON ch_codesp = es.codesp WHERE id = ${req.params.id} ORDER BY id ASC`;

  let validado_by_id = await connection.query(query_validado, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(validado_by_id[0])
};


export {
  checking_admision,
  update_dj1,
  update_ch_edni,
  update_ch_secu,
  update_ch_djsecu,
  update_ch_p_matricula,
  update_ch_p_cuota,
  get_user_by_id,
  get_descuentos_modalidades,
  validar_estudiante,
  validado_by_id
};
