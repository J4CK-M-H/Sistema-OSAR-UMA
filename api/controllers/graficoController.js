import { request, response } from "express";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";

const estudiantesMatriculados = async (req = request, res) => {
  const { cod_esp } = req.body;

  let filtro = "";
  if (cod_esp != undefined && cod_esp != null) {
    filtro = `WHERE cod_esp = '${cod_esp}'`;
  }

  let query = `SELECT periodo, sum(desertores) as desertores , sum(egresados) AS egresados , SUM(m_actual) AS matriculados FROM reporte_uma ${filtro} GROUP BY periodo ORDER BY periodo DESC LIMIT 6`;
  let matriculados = await connection.query(query, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  // INVERTIRMOS EL ARRAY PARA IR DE MAS ANTIGUO A NUEVO
  return res.status(200).json(matriculados.reverse());
};

const get_convalidantes = async (req = request, res = response) => {
  const { where } = req.body;

  if (where) {
    let query_convalidates = await connection.query(
      `SELECT * FROM (SELECT periodo, SUM(cachimbos) AS cachimbos, SUM(traslados) AS convalidantes FROM reporte_uma" . ${where} . " GROUP BY periodo ORDER BY periodo DESC LIMIT 6) AS subquery ORDER BY periodo ASC`,
      {
        type: QueryTypes.SELECT,
        raw: false,
      }
    );
    return res.status(200).json(query_convalidates);
  }

  let query_convalidates = await connection.query(
    `SELECT * FROM (SELECT periodo, SUM(cachimbos) AS cachimbos, SUM(traslados) AS convalidantes FROM reporte_uma GROUP BY periodo ORDER BY periodo DESC LIMIT 6) AS subquery ORDER BY periodo ASC`,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );
  return res.status(200).json(query_convalidates);
};

const get_recuperos_desercion = async (req, res) => {
  const { cod_esp } = req.body;

  let filtro = "";
  if (cod_esp != undefined && cod_esp != null) {
    filtro = `WHERE cod_esp = '${cod_esp}'`;
  }

  let query_recuperos_desercion = `SELECT * FROM (SELECT periodo, (SUM(cachimbos)+SUM(traslados)) AS crecimiento, SUM(desertores) AS desercion_t, SUM(recuperos) AS recuperos_t FROM reporte_uma ${filtro} GROUP BY periodo ORDER BY periodo DESC LIMIT 6) AS subquery ORDER BY periodo ASC`;

  let recuperos_desercion = await connection.query(query_recuperos_desercion, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(recuperos_desercion);
};

const get_nuevos_convalidados = async (req = request, res) => {
  const { cod_esp } = req.body;

  let filtro = "";
  if (cod_esp != undefined && cod_esp != null) {
    filtro = `WHERE cod_esp = '${cod_esp}'`;
  }

  let query_nuevos_convalidantes = `SELECT * FROM (SELECT periodo, SUM(cachimbos) AS cachimbos, SUM(traslados) AS convalidantes FROM reporte_uma ${filtro} GROUP BY periodo ORDER BY periodo DESC LIMIT 6) AS subquery ORDER BY periodo ASC`;

  let nuevos_convalidantes = await connection.query(
    query_nuevos_convalidantes,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  return res.status(200).json(nuevos_convalidantes);
};

const get_graficos_con_filtro = async (req = request, res) => {
  const { cod_esp } = req.body;

  let filtro = "";
  if (cod_esp != undefined && cod_esp != null) {
    filtro = `WHERE cod_esp = '${cod_esp}'`;
  }

  let query_estudiantes_matriculados = `SELECT periodo, sum(desertores) as desertores , sum(egresados) AS egresados , SUM(m_actual) AS matriculados FROM reporte_uma ${filtro} GROUP BY periodo ORDER BY periodo DESC LIMIT 6`;

  let query_nuevos_convalidantes = `SELECT * FROM (SELECT periodo, SUM(cachimbos) AS cachimbos, SUM(traslados) AS convalidantes FROM reporte_uma ${filtro} GROUP BY periodo ORDER BY periodo DESC LIMIT 6) AS subquery ORDER BY periodo ASC`;

  let query_recuperos_desercion = `SELECT * FROM (SELECT periodo, (SUM(cachimbos)+SUM(traslados)) AS crecimiento, SUM(desertores) AS desercion_t, SUM(recuperos) AS recuperos_t FROM reporte_uma ${filtro} GROUP BY periodo ORDER BY periodo DESC LIMIT 6) AS subquery ORDER BY periodo ASC`;

  let estudiantes_matriculados = await connection.query(
    query_estudiantes_matriculados,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  let nuevos_convalidantes = await connection.query(
    query_nuevos_convalidantes,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  let recuperos_desercion = await connection.query(query_recuperos_desercion, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res
    .status(200)
    .json({estudiantes_matriculados: estudiantes_matriculados.reverse(), nuevos_convalidantes, recuperos_desercion});
};

export {
  estudiantesMatriculados,
  get_convalidantes,
  get_recuperos_desercion,
  get_nuevos_convalidados,
  get_graficos_con_filtro,
};
