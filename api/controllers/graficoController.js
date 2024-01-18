import { request } from "express";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";

const estudiantesMatriculados = async (req = request, res) => {
  const { cod_esp } = req.body;

  let filtro = '';
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
export { estudiantesMatriculados };
