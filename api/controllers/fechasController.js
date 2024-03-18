import { QueryTypes } from "sequelize";
import { connection } from "../db/database.js";
import { request } from "express";

const fechas_ingreso_egreso = async (req = request, res) => {
  try {
    let query = "SELECT * FROM fechas_ingreso_egreso";
    let resultado = await connection.query(query, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

const agregar_registro = async (req = request, res) => {
  let { fechaIngreso, fechaEgreso, periodo, tipo } = req.body;

  try {
    let query = `INSERT INTO fechas_ingreso_egreso VALUES (DEFAULT, '${periodo}','${fechaIngreso}','${fechaEgreso}','${tipo}')`;
    await connection.query(query, {
      type: QueryTypes.INSERT,
      raw: false,
    });
    return res.status(201).json({ msg: "REGISTRADO CORRECTAMENTE" });
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

const actualizar_fecha_ingreso_egreso = async (req = request, res) => {
  let { id } = req.params;
  let { periodo, tipo, fecha_ingreso, fecha_egreso } = req.body;

  try {
    await connection.query("SET SQL_SAFE_UPDATES = 0;");
    let query = `UPDATE fechas_ingreso_egreso SET periodo = '${periodo}', tipo = '${tipo}', fecha_ingreso = '${fecha_ingreso}', fecha_egreso = '${fecha_egreso}' WHERE id = ${id}`;
    await connection.query(query, {
      type: QueryTypes.UPDATE,
      raw: false,
    });
    return res.status(200).json({ msg: "REGISTRO ACTUALIZADO" });
  } catch (error) {
    return res.status(500).json({ msg: "ERROR EN EL SERVIDOR" });
  }
};

export {
  fechas_ingreso_egreso,
  agregar_registro,
  actualizar_fecha_ingreso_egreso,
};
