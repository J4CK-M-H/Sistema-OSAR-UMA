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

const graficos_por_defecto = async (req = request, res) => {
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

  return res.status(200).json({
    estudiantes_matriculados: estudiantes_matriculados.reverse(),
    nuevos_convalidantes,
    recuperos_desercion,
  });
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

  return res.status(200).json({
    estudiantes_matriculados: estudiantes_matriculados.reverse(),
    nuevos_convalidantes,
    recuperos_desercion,
  });
};

const data_reporte_academico = async (req = request, res) => {
  const { idrol } = req.usuario;
  const { periodo } = req.body;

  try {

    let query_programa_academico = `SELECT carrera, m_actual, m_ambos, ROUND((m_ambos / m_actual) * 100, 2) 
    AS est_ma, cachimbos + traslados AS nuevos_total, cachimbos, ROUND((cachimbos / m_actual) * 100, 2) 
    AS est_c , traslados, ROUND((traslados / m_actual) * 100, 2) AS est_t, recuperos, est_r, egresados, est_e, desertores, est_d 
    FROM reporte_uma where periodo = '${periodo}'`;

    // let query_programa_academico = `SELECT carrera, m_actual, m_ambos, ROUND((m_ambos / m_actual) * 100, 2) AS est_ma, cachimbos + traslados AS nuevos_total, cachimbos, ROUND((cachimbos / m_actual) * 100, 2) AS est_c , traslados, ROUND((traslados / m_actual) * 100, 2) AS est_t, recuperos, est_r, egresados, est_e, desertores, est_d FROM reporte_uma WHERE ( (${idrol} = 1 AND reporte_uma.cod_esp IN ('E1','E2','E3','E4','S1', 'S2','S3','S4', 'MS', 'EC','ED','EQ','EI','ES')) OR (${idrol} = 2 AND reporte_uma.cod_esp IN ('E1','E2','E3','E4','S1', 'S2','S3','S4', 'MS', 'EC','ED','EQ','EI','ES')) OR (${idrol} = 4 AND reporte_uma.cod_esp IN ('E1','E2','E3','E4')) OR (${idrol} = 5 AND reporte_uma.cod_esp IN ('S1', 'S2','S3','S4')) OR (${idrol} = 6 AND reporte_uma.cod_esp IN ('MS')) OR (${idrol} = 7 AND reporte_uma.cod_esp IN ('E1','E4')) OR (${idrol} = 8 AND reporte_uma.cod_esp IN ('E2')) OR (${idrol} = 9 AND reporte_uma.cod_esp IN ('E3')) OR (${idrol} = 10 AND reporte_uma.cod_esp IN ('S1')) OR (${idrol} = 11 AND reporte_uma.cod_esp IN ('S2')) OR (${idrol} = 12 AND reporte_uma.cod_esp IN ('S3')) OR (${idrol} = 13 AND reporte_uma.cod_esp IN ('S4')) OR (${idrol} = 14 AND reporte_uma.cod_esp IN ('E1','E2','E3','E4','S1', 'S2','S3','S4', 'MS', 'EC','ED','EQ','EI','ES')) OR (${idrol} = 15 AND reporte_uma.cod_esp IN ('S1','EC','ED','EQ','EI','ES'))  AND periodo = '20241')`;

    let data_programa_academico = await connection.query(
      query_programa_academico,
      {
        type: QueryTypes.SELECT,
        raw: false,
      }
    );
    return res.status(200).json(data_programa_academico);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el sevidor!" });
  }
};

export {
  estudiantesMatriculados,
  get_convalidantes,
  get_recuperos_desercion,
  get_nuevos_convalidados,
  get_graficos_con_filtro,
  graficos_por_defecto,
  data_reporte_academico,
};
