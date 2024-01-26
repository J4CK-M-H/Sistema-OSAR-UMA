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

const validado_by_id = async (req, res) => {
  let query_validado = `SELECT id, ch_dni, CONCAT(ch_nombres,' ', ch_apepat,' ', ch_apemat) AS ch_nombres, es.abrev, ch_validacion, ch_edni, ch_dj, ch_secu, ch_djsecu, ch_p_matricula, ch_p_cuota, ch_estado_alu FROM checking_admision INNER JOIN especialidad es ON ch_codesp = es.codesp WHERE id = ${req.params.id} ORDER BY id ASC`;

  let validado_by_id = await connection.query(query_validado, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(validado_by_id[0]);
};

const lista_admision = async (req, res) => {
  let query_lista_admision = "SELECT * from  admision_data_alu";
  let lista_admision = await connection.query(query_lista_admision, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(lista_admision);
};

const update_estado_entrevista = async (req = request, res) => {
  await connection.query(
    `UPDATE admision_data_alu SET estado_entrevista = ${req.body.estado_entrevista} where id = ${req.params.id}`,
    {
      type: QueryTypes.UPDATE,
      raw: false,
    }
  );

  return res.status(200).json("OK");
};

const agregar_estudiante = async (req = request, res = response) => {
  await connection.query(
    `INSERT INTO admision_data_alu (dni, nombres, apellidos, edad, correo, telefono, carrera) VALUES ('${req.body.dni}', '${req.body.nombres}', '${req.body.apellidos}', '${req.body.edad}', '${req.body.correo}', '${req.body.telefono}', '${req.body.carrera}') `,
    {
      type: QueryTypes.INSERT,
      raw: false,
    }
  );

  return res.status(200).json({ message: "Estudiante Registrado" });
};

const obtener_carreras = async (req, res) => {
  let carreras = await connection.query("SELECT * FROM especialidad", {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(carreras);
};

const get_periodos = async (req, res) => {
  let periodos = await connection.query(
    "SELECT distinct periodo from  checking_admision",
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  return res.status(200).json(periodos);
};

const reporte_general = async (req = request, res) => {
  const { anio, mes, periodo, option } = req.body;

  let tipo = option == "M" ? "matriculado" : "inscrito";
  let estado_alu = option == "M" ? 1 : 0;

  let month = `py.${mes.mes}`;
  let ultimo_dia = new Date(
    anio.anio,
    `${mes.id.length < 9 ? `0${mes.id}` : `${mes.id}`}`,
    0
  ).getDate();
  let fecha_inicio = `${anio.anio}-${
    mes.id <= 9 ? `0${mes.id}` : `${mes.id}`
  }-01`;
  let fecha_fin = `${anio.anio}-${
    mes.id <= 9 ? `0${mes.id}` : `${mes.id}`
  }-${ultimo_dia}`;

  let fecha_reg_mat = estado_alu == 1 ? "ch_fecha_mat" : "ch_fecha_reg";

  let query_reporte_general = `
  SELECT es.nomesp AS 'carrera', py.leads as 'valor_lead', py.idproy, 
  SUM(CASE WHEN ch.${fecha_reg_mat} BETWEEN inicio_mes AND fin_semana_1 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) AS 'rsem1', 
  CAST(${month}/4 AS UNSIGNED) AS 'psem1',
  CONCAT(ROUND(SUM(CASE WHEN ch.${fecha_reg_mat} BETWEEN inicio_mes AND fin_semana_1 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) / (${month}/4) * 100, 0), '%') AS 'lsem1',
  SUM(CASE WHEN ch.${fecha_reg_mat} > fin_semana_1 AND ch.${fecha_reg_mat} <= fin_semana_2 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) AS 'rsem2', CAST(${month}/4 AS UNSIGNED) AS 'psem2', 
  CONCAT(ROUND(SUM(CASE WHEN ch.${fecha_reg_mat} > fin_semana_1 AND ch.${fecha_reg_mat} <= fin_semana_2 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) / (${month}/4) * 100, 0), '%') AS 'lsem2',
   SUM(CASE WHEN ch.${fecha_reg_mat} > fin_semana_2 AND ch.${fecha_reg_mat} <= fin_semana_3 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) AS 'rsem3', CAST(${month}/4 AS UNSIGNED) AS 'psem3', 
   CONCAT(ROUND(SUM(CASE WHEN ch.${fecha_reg_mat} > fin_semana_2 AND ch.${fecha_reg_mat} <= fin_semana_3 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) / (${month}/4) * 100, 0), '%') AS 'lsem3', 
  SUM(CASE WHEN ch.${fecha_reg_mat} > fin_semana_3 AND ch.${fecha_reg_mat} <= fin_semana_4 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) AS 'rsem4', CAST(${month}/4 AS UNSIGNED) AS 'psem4', 
  CONCAT(ROUND(SUM(CASE WHEN ch.${fecha_reg_mat} > fin_semana_3 AND ch.${fecha_reg_mat} <= fin_semana_4 AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) / (${month}/4) * 100, 0), '%') AS 'lsem4', 

  SUM(CASE WHEN ch.${fecha_reg_mat} BETWEEN inicio_mes AND fin_mes AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) AS 'rtotalmes', 
  ${month} AS 'ptotalmes', 
  CONCAT(ROUND(SUM(CASE WHEN ch.${fecha_reg_mat} BETWEEN inicio_mes AND fin_mes AND ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) /${month} * 100, 0), '%') AS 'ltotalmes', 
  SUM(CASE WHEN ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) AS 'rtotalcamp', 
  (py.enero + py.febrero + py.marzo + py.abril + py.mayo + py.junio + py.julio + py.agosto + py.septiembre + py.octubre + py.noviembre + py.diciembre) AS 'ptotalcamp',
  CONCAT(ROUND(SUM(CASE WHEN ch.ch_estado_alu = ${estado_alu} THEN 1 ELSE 0 END) / (py.enero + py.febrero + py.marzo + py.abril + py.mayo + py.junio + py.julio + py.agosto + py.septiembre + py.octubre + py.noviembre + py.diciembre) * 100, 0), '%') AS 'ltotalcamp' 
  FROM 
  checking_admision ch
   INNER JOIN especialidad es ON ch.ch_codesp = es.codesp 
   INNER JOIN admision_proyeccion py ON ch.ch_codesp = py.carrera 
   CROSS JOIN ( 
    SELECT 
      DATE_FORMAT(NOW(), '%Y-%m') AS mes_actual,
      '${fecha_inicio}' AS inicio_mes,
      '${fecha_fin}' AS fin_mes,
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 7 DAY), '%Y-%m-%d') AS fin_semana_1, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 14 DAY), '%Y-%m-%d') AS fin_semana_2, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 21 DAY), '%Y-%m-%d') AS fin_semana_3, 
      '${fecha_fin}' AS fin_semana_4
    ) AS fechas
  WHERE py.tipo = '${tipo}' AND py.periodo = ${periodo.periodo} 
  GROUP BY es.nomesp`;

  let query_leads_matriculados = `SELECT carrera, valor_lead, idproy, tipo, rtotalcamp, siglas FROM ( 
      SELECT es.nomesp AS 'carrera', py.leads as 'valor_lead', py.idproy, py.tipo,  py.carrera as 'siglas', 
      SUM(CASE WHEN ch.ch_estado_alu = 1 THEN 1 ELSE 0 END) AS 'rtotalcamp'
      FROM checking_admision ch INNER JOIN especialidad es ON ch.ch_codesp = es.codesp INNER JOIN admision_proyeccion py 
      ON ch.ch_codesp = py.carrera
      CROSS JOIN ( 
      SELECT DATE_FORMAT(NOW(), '%Y-%m') AS mes_actual, '${fecha_inicio}' AS inicio_mes, '${fecha_fin}' AS fin_mes, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 7 DAY), '%Y-%m-%d') AS fin_semana_1, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 14 DAY), '%Y-%m-%d') AS fin_semana_2, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 21 DAY), '%Y-%m-%d') AS fin_semana_3, '${fecha_fin}' AS
      fin_semana_4 ) AS fechas WHERE py.tipo = 'matriculado' AND py.periodo = ${periodo.periodo} GROUP BY es.nomesp) a`;

  let query_leads_inscritos = `SELECT carrera, valor_lead, idproy, tipo, rtotalcamp, siglas FROM ( 
      SELECT es.nomesp AS 'carrera', py.leads as 'valor_lead', py.idproy, py.tipo,  py.carrera as 'siglas', 
      SUM(CASE WHEN ch.ch_estado_alu = 0 THEN 1 ELSE 0 END) AS 'rtotalcamp'
      FROM checking_admision ch INNER JOIN especialidad es ON ch.ch_codesp = es.codesp INNER JOIN admision_proyeccion py 
      ON ch.ch_codesp = py.carrera
      CROSS JOIN ( 
      SELECT DATE_FORMAT(NOW(), '%Y-%m') AS mes_actual, '${fecha_inicio}' AS inicio_mes, '${fecha_fin}' AS fin_mes, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 7 DAY), '%Y-%m-%d') AS fin_semana_1, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 14 DAY), '%Y-%m-%d') AS fin_semana_2, 
      DATE_FORMAT(DATE_ADD('${fecha_inicio}', INTERVAL 21 DAY), '%Y-%m-%d') AS fin_semana_3, '${fecha_fin}' AS
      fin_semana_4 ) AS fechas WHERE py.tipo = 'inscrito' AND py.periodo = ${periodo.periodo} GROUP BY es.nomesp) a`;

  try {
    let reporte_general = await connection.query(query_reporte_general, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    let leads_matriculados = await connection.query(query_leads_matriculados, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    let leads_inscritos = await connection.query(query_leads_inscritos, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    return res
      .status(200)
      .json({ reporte_general, leads_matriculados, leads_inscritos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update_lead = async (req, res) => {
  const { id } = req.params;
  let { valor_lead, siglas } = req.body;

  if (valor_lead == 0 || valor_lead.trim() == "") {
    valor_lead = 0;
  }

  let query_update_lead = `UPDATE admision_proyeccion set leads = ${valor_lead} where carrera = '${siglas}'`;
  await connection.query("SET SQL_SAFE_UPDATES = 0");
  await connection.query(query_update_lead, {
    type: QueryTypes.UPDATE,
    raw: false,
  });

  console.log(query_update_lead);

  return res.status(200).json("OK");
};

const lista_proyeccion = async (req = request, res) => {
  let query_lista_proyeccion =
    "SELECT idproy, periodo, es.`nomesp`, tipo, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre FROM admision_proyeccion py INNER JOIN especialidad es ON es.`codesp` = py.`carrera` ORDER BY idproy ASC";

  let lista_proyeccion = await connection.query(query_lista_proyeccion, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(lista_proyeccion);
};

const cargar_carreras = async (req = request, res) => {
  try {
    let carreras = await connection.query(
      "SELECT nomesp,codesp FROM especialidad",
      {
        type: QueryTypes.SELECT,
        raw: false,
      }
    );
    return res.status(200).json(carreras);
  } catch (error) {
    return res.status(500).json({ msg: "Error al consultar las carreras" });
  }
};

const agregar_proyeccion = async (req = request, res) => {
  let {
    periodo,
    tipo,
    carrera,
    enero,
    febrero,
    marzo,
    abril,
    mayo,
    junio,
    julio,
    agosto,
    septiembre,
    octubre,
    noviembre,
    diciembre,
  } = req.body;

  let query_agregar_proyeccion = `INSERT INTO admision_proyeccion (periodo, carrera, tipo, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre) VALUES ('${periodo}', '${carrera}', '${tipo}', '${enero}', '${febrero}', '${marzo}', '${abril}', '${mayo}', '${junio}', '${julio}', '${agosto}', '${septiembre}', '${octubre}', '${noviembre}', '${diciembre}')`;

  await connection.query(query_agregar_proyeccion);

  return res.status(200).json("OK");
};

const borrar_proyeccion = async (req, res) => {
  const { id } = req.params;

  let query_borrar_proyeccion = `DELETE FROM admision_proyeccion where idproy = ${id}`;

  await connection.query(query_borrar_proyeccion);

  return res.status(200).json("Proyeccion eliminada");
};

const buscar_proyeccion = async (req = request, res) => {
  const { id } = req.params;

  let query_buscar_proyeccion = `SELECT ap.*,esp.nomesp FROM admision_proyeccion as ap
  INNER JOIN especialidad as esp on esp.codesp = ap.carrera
  where ap.idproy = ${id}`;

  let buscar_proyeccion = await connection.query(query_buscar_proyeccion, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return res.status(200).json(buscar_proyeccion[0]);
};

const editar_proyeccion = async (req = request, res) => {
  const { id } = req.params;

  let {
    periodo,
    tipo,
    carrera,
    enero,
    febrero,
    marzo,
    abril,
    mayo,
    junio,
    julio,
    agosto,
    septiembre,
    octubre,
    noviembre,
    diciembre,
  } = req.body;

  let query_editar_proyeccion = `UPDATE admision_proyeccion set periodo = '${periodo}', carrera = '${carrera}', tipo = '${tipo}', enero = '${enero}', febrero = '${febrero}', marzo = '${marzo}', abril = '${abril}', mayo = '${mayo}', junio = '${junio}', julio = '${julio}', agosto = '${agosto}', septiembre = '${septiembre}', octubre = '${octubre}', noviembre = '${noviembre}', diciembre = '${diciembre}' WHERE idproy = ${id}`;

  let editar_proyeccion = await connection.query(query_editar_proyeccion, {
    type: QueryTypes.UPDATE,
    raw: false,
  });

  return res.status(200).json("Proyeccion editada")
  console.log(query_editar_proyeccion);
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
  validado_by_id,
  lista_admision,
  update_estado_entrevista,
  agregar_estudiante,
  obtener_carreras,
  get_periodos,
  reporte_general,
  update_lead,
  lista_proyeccion,
  cargar_carreras,
  agregar_proyeccion,
  borrar_proyeccion,
  buscar_proyeccion,
  editar_proyeccion,
};
