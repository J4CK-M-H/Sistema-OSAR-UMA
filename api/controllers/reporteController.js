import { request } from "express";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";

const periodos_reporte = async (req = request, res) => {
  let prepago_query =
    "SELECT DISTINCT periodo FROM prueba ORDER BY periodo DESC";

  let periodos = await connection.query(prepago_query, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json(periodos);
};

const reportes = async (req = request, res) => {
  let { periodo, radioOption: estado } = req.body;

  let pregrado_query = `SELECT 'ADMINISTRACION Y NEGOCIOS INTERNACIONALES' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E1','E4') AND estado = '${estado}'
  UNION ALL
  SELECT 'ADMINISTRACION Y MARKETING' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E2') AND estado = '${estado}'
  UNION ALL
  SELECT 'CONTABILIDAD Y FINANZAS' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E3') AND estado = '${estado}'
  UNION ALL
  SELECT 'INGENIERÍA INDUSTRIAL' AS CARRERA,
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E5') AND estado = '${estado}'
  UNION ALL
  SELECT 'ENFERMERIA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S1') AND estado = '${estado}'
  UNION ALL 
  SELECT 'FARMACIA Y BIOQUIMICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S2') AND estado = '${estado}'
  UNION ALL
  SELECT 'NUTRICION Y DIETETICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S3') AND estado = '${estado}'
  UNION ALL
  SELECT 'PSICOLOGIA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S4') AND estado = '${estado}'
  UNION ALL
  SELECT 'TECNOLOGÍA MÉDICA EN TERAPIA FÍSICA Y REHABILITACIÓN' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S5') AND estado = '${estado}'
  UNION ALL
  SELECT 'TECNOLOGÍA MÉDICA EN LABORATORIO CLÍNICO Y ANATOMÍA PATOLÓGICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S6') AND estado = '${estado}'`;

  let prepagos = await connection.query(pregrado_query, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  // SEGUNDA ESPECIALIDAD
  let segunda_especialidad_query = `SELECT 'CRECIMIENTO Y DESARROLLO' AS CARRERA, 
COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
COALESCE(COUNT(*),0) AS TOTAL
FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('EC') AND estado = '${estado}'
UNION ALL
SELECT 'EMERGENCIAS Y DESASTRES' AS CARRERA, 
COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
COALESCE(COUNT(*),0) AS TOTAL
FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('ED') AND estado = '${estado}'
UNION ALL
SELECT 'CUIDADOS INTENSIVOS' AS CARRERA, 
COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
COALESCE(COUNT(*),0) AS TOTAL
FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('EI') AND estado = '${estado}'
UNION ALL
SELECT 'CENTRO QUIRÚRGICO' AS CARRERA, 
COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
COALESCE(COUNT(*),0) AS TOTAL
FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('EQ') AND estado = '${estado}'
UNION ALL
SELECT 'SALUD FAMILIAR Y COMUNITARIA' AS CARRERA, 
COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
COALESCE(COUNT(*),0) AS TOTAL
FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('ES') AND estado = '${estado}'`;

  let segunda_especialidad = await connection.query(
    segunda_especialidad_query,
    {
      type: QueryTypes.SELECT,
      // raw: false,
    }
  );

  let maestria_query = `SELECT 'MAESTRÍA EN SALUD PÚBLICA' AS CARRERA, 
COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
COALESCE(SUM(CASE WHEN semestre IN (1,0,2,3,4) THEN 1 ELSE 0 END),0) AS toti,
COALESCE(COUNT(*),0) AS TOTAL
FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('MS') AND estado = '${estado}'`;

  let maestrias = await connection.query(maestria_query, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json({
    prepagos: prepagos,
    segunda_especialidad: segunda_especialidad,
    maestrias: maestrias,
  });
};

const periodo_filter = async (req = request, res) => {
  const { periodo, radioOption: estado } = req.body;

  let query_prepago_filter = `SELECT 'ADMINISTRACION Y NEGOCIOS INTERNACIONALES' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E1','E4') AND estado = '${estado}'
  UNION ALL
  SELECT 'ADMINISTRACION Y MARKETING' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E2') AND estado = '${estado}'
  UNION ALL
  SELECT 'CONTABILIDAD Y FINANZAS' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E3') AND estado = '${estado}'
  UNION ALL
  SELECT 'INGENIERÍA INDUSTRIAL' AS CARRERA,
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('E5') AND estado = '${estado}'
  UNION ALL
  SELECT 'ENFERMERIA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S1') AND estado = '${estado}'
  UNION ALL 
  SELECT 'FARMACIA Y BIOQUIMICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S2') AND estado = '${estado}'
  UNION ALL
  SELECT 'NUTRICION Y DIETETICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S3') AND estado = '${estado}'
  UNION ALL
  SELECT 'PSICOLOGIA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S4') AND estado = '${estado}'
  UNION ALL
  SELECT 'TECNOLOGÍA MÉDICA EN TERAPIA FÍSICA Y REHABILITACIÓN' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S5') AND estado = '${estado}'
  UNION ALL
  SELECT 'TECNOLOGÍA MÉDICA EN LABORATORIO CLÍNICO Y ANATOMÍA PATOLÓGICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre = 5 THEN 1 ELSE 0 END),0) AS CICLO5,
  COALESCE(SUM(CASE WHEN semestre = 6 THEN 1 ELSE 0 END),0) AS CICLO6,
  COALESCE(SUM(CASE WHEN semestre = 7 THEN 1 ELSE 0 END),0) AS CICLO7,
  COALESCE(SUM(CASE WHEN semestre = 8 THEN 1 ELSE 0 END),0) AS CICLO8,
  COALESCE(SUM(CASE WHEN semestre = 9 THEN 1 ELSE 0 END),0) AS CICLO9,
  COALESCE(SUM(CASE WHEN semestre = 10 THEN 1 ELSE 0 END),0) AS CICLO10,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('S6') AND estado = '${estado}'`;

  let query_segunda_especialidad_filter = `SELECT 'CRECIMIENTO Y DESARROLLO' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('EC') AND estado = '${estado}'
  UNION ALL
  SELECT 'EMERGENCIAS Y DESASTRES' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('ED') AND estado = '${estado}'
  UNION ALL
  SELECT 'CUIDADOS INTENSIVOS' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('EI') AND estado = '${estado}'
  UNION ALL
  SELECT 'CENTRO QUIRÚRGICO' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('EQ') AND estado = '${estado}'
  UNION ALL
  SELECT 'SALUD FAMILIAR Y COMUNITARIA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('ES') AND estado = '${estado}'`;

  let query_maestrias_filter = `SELECT 'MAESTRÍA EN SALUD PÚBLICA' AS CARRERA, 
  COALESCE(SUM(CASE WHEN semestre IN(1,0) THEN 1 ELSE 0 END),0) AS CICLO1,
  COALESCE(SUM(CASE WHEN semestre = 2 THEN 1 ELSE 0 END),0) AS CICLO2,
  COALESCE(SUM(CASE WHEN semestre = 3 THEN 1 ELSE 0 END),0) AS CICLO3,
  COALESCE(SUM(CASE WHEN semestre = 4 THEN 1 ELSE 0 END),0) AS CICLO4,
  COALESCE(SUM(CASE WHEN semestre IN (1,0,2,3,4) THEN 1 ELSE 0 END),0) AS toti,
  COALESCE(COUNT(*),0) AS TOTAL
  FROM prueba WHERE periodo = ${periodo} AND codigo_esp IN ('MS') AND estado = '${estado}'`;

  let prepagos = await connection.query(query_prepago_filter, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  let segunda_especialidad = await connection.query(
    query_segunda_especialidad_filter,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  let maestrias = await connection.query(query_maestrias_filter, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json({
    prepagos: prepagos,
    segunda_especialidad: segunda_especialidad,
    maestrias: maestrias,
  });
};

const reporte_sunedu_minedu = async (req = request, res) => {
  let { periodo } = req.body;

  let query_prepago = `SELECT carrera, total, hombre, est_h, mujer, est_m FROM sunedu_minedu WHERE periodo =  ${periodo} AND tipo_esp = 'PREGRADO'
  UNION ALL 
  SELECT 'TOTAL' AS carrera, COALESCE(SUM(total),0) AS total, COALESCE(SUM(hombre),0) AS hombre, COALESCE(CONCAT(ROUND((SUM(hombre) / SUM(total)) * 100,0),'%'),0) AS est_h, COALESCE(SUM(mujer),0) AS mujer, COALESCE(CONCAT(ROUND((SUM(mujer) / SUM(total)) * 100,0),'%'),0) AS est_m
  FROM sunedu_minedu WHERE periodo = ${periodo} AND tipo_esp = 'PREGRADO'`;

  let query_segunda_especialidad = `SELECT carrera, total, hombre, est_h, mujer, est_m FROM sunedu_minedu WHERE periodo =  ${periodo} AND tipo_esp = 'SEGESP'
  UNION ALL 
  SELECT 'TOTAL' AS carrera, COALESCE(SUM(total),0) AS total, COALESCE(SUM(hombre),0) AS hombre, COALESCE(CONCAT(ROUND((SUM(hombre) / SUM(total)) * 100,0),'%'),0) AS est_h, COALESCE(SUM(mujer),0) AS mujer, COALESCE(CONCAT(ROUND((SUM(mujer) / SUM(total)) * 100,0),'%'),0) AS est_m
  FROM sunedu_minedu WHERE periodo = ${periodo} AND tipo_esp = 'SEGESP'`;

  let query_maestria = `SELECT carrera, total, hombre, est_h, mujer, est_m FROM sunedu_minedu WHERE periodo =  ${periodo} AND tipo_esp = 'MAESTRIA'
  UNION ALL 
  SELECT 'TOTAL' AS carrera, COALESCE(SUM(total),0) AS total, COALESCE(SUM(hombre),0) AS hombre, COALESCE(CONCAT(ROUND((SUM(hombre) / SUM(total)) * 100,0),'%'),0) AS est_h, COALESCE(SUM(mujer),0) AS mujer, COALESCE(CONCAT(ROUND((SUM(mujer) / SUM(total)) * 100,0),'%'),0) AS est_m
  FROM sunedu_minedu WHERE periodo = ${periodo} AND tipo_esp = 'MAESTRIA'`;

  let reporte_prepago = await connection.query(query_prepago, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  let reporte_segunda_especialidad = await connection.query(
    query_segunda_especialidad,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  let reporte_maestria = await connection.query(query_maestria, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  return res.status(200).json({
    prepago: reporte_prepago,
    segunda_especialidad: reporte_segunda_especialidad,
    maestria: reporte_maestria,
  });
};



export {
  reportes,
  periodos_reporte,
  periodo_filter,
  reporte_sunedu_minedu,
};
