import { QueryTypes } from "sequelize";
import { connection } from "../db/database.js";
import XLSX from "xlsx";
import { query, request } from "express";
import fs from "fs";
import { validationResult } from "express-validator";

const data_libro_6 = async (req = request, res) => {
  let query_libro_6 = "SELECT * FROM libro_6 WHERE nota >= 12;";
  let resultado_libro_6 = await connection.query(query_libro_6, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return res.status(200).json(resultado_libro_6);
};

const data_libro_5 = async (req = request, res) => {
  let query_libro_6 = "SELECT * FROM libro_5";
  let resultado_libro_6 = await connection.query(query_libro_6, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return res.status(200).json(resultado_libro_6);
};

const registrar_libro_6 = async (req = request, res) => {
  const {
    creditos,
    fechaEmision,
    fechaTaller,
    participacion,
    escuelaOrganizadora,
    nombreTaller,
  } = req.body;

  if (req.files) {
    let excel = req.files.archivo;
    let date = Date.now();
    let direction = `${date}-${excel.name}`;
    await excel.mv("./uploads/" + `${direction}`);
    let book = XLSX.readFile("./uploads/" + `${direction}`);
    let sheet_name_list = book.SheetNames;

    let data = XLSX.utils.sheet_to_json(book.Sheets[sheet_name_list[0]]);
    // PARA SER MAS PRECISO SE PUEDE PONER EL NOMBRE DE LA PESTAÑA DEL CUANTO SE EXTRAERA LOS DATOS O SE PUEDEN PONER EL NUMERO DE LA POSICION
    // console.log(book.Sheets['Worksheet']);

    // ELIMINAMOS EL PRIMER ELEMENTO DEL ARRAY PARA DEJARLOS SIN CABECERAS Y OBTENER SOLO DATOS
    for (let index = 1; index <= 8; index++) {
      data.shift();
    }

    let query_ultimo_folio =
      "SELECT numero_folio FROM libro_6 ORDER BY id DESC LIMIT 1";
    let ultimo_folio = await connection.query(query_ultimo_folio, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    let numero_folio_lleno = 0;
    let numero_folio_vacio = 0;

    if (ultimo_folio.length == "0") {
      try {
        data.forEach(async (registro) => {
          numero_folio_vacio = numero_folio_vacio + 1;
          let query_libro_6 = `INSERT INTO libro_6 VALUES (DEFAULT, '${numero_folio_vacio}','${registro["__EMPTY_2"]}','${participacion}','${registro["__EMPTY_9"]}','${nombreTaller}','${creditos}','${fechaTaller}','${escuelaOrganizadora}','${fechaEmision}','')`;

          await connection.query(query_libro_6, {
            type: QueryTypes.INSERT,
            raw: false,
          });
        });

        return res.status(200).json({ msg: "REGISTRO COMPLETO" });
      } catch (error) {
        return res
          .status(200)
          .json({ msg: "NO SE PUDO REGISTRAR LOS DATOS EL LIBRO 6" });
      } finally {
        fs.unlinkSync(
          `1707758462743-Acta de Notas-2023-II-TENF0003-ABORDAJE DE ENFERMERÃA EN EMERGENCIA PREHOSPITALARIAS-20240201-135603.xlsx`
        );
      }
    }

    numero_folio_lleno = `${parseInt(parseInt(ultimo_folio[0].numero_folio))}`;
    data.forEach(async (registro) => {
      numero_folio_lleno++;

      let query_libro_6 = `INSERT INTO libro_6 VALUES (DEFAULT, '${numero_folio_lleno}','${registro[
        "__EMPTY_2"
      ].trim()}','${participacion}','${
        registro["__EMPTY_9"]
      }','${nombreTaller}','${creditos}','${fechaTaller}','${escuelaOrganizadora}','${fechaEmision}','')`;

      await connection.query(query_libro_6, {
        type: QueryTypes.INSERT,
        raw: false,
      });
    });
    return res.status(200).json({ msg: "REGISTRO COMPLETO" });
  }

  return res.status(200).json({ msg: "NO SE SUBIO NINGUN ARCHIVO" });
};

const data_alumnos = async (req = request, res) => {
  let query_uma_alumnos =
    "select concat(paterno, ' ', materno,' ' ,nombres) as nombres,codigo,nomesp  from uma_alumnos";
  let resultado_uma_alumnos = await connection.query(query_uma_alumnos, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return res.status(200).json(resultado_uma_alumnos);
};

const alumno_filtro_libro_5 = async (req = request, res) => {
  const { codigo, nombres, carrera } = req.body;

  let estudiante_por_codigo = `SELECT * FROM uma_alumnos WHERE codigo = '${codigo}' AND nomesp = '${carrera}'`;
  let resultado_estudiante_por_codigo = await connection.query(
    estudiante_por_codigo,
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );

  let concatenados = `${codigo}${resultado_estudiante_por_codigo[0].c_codesp}`;

  let periodo_egresado = `select periodo from egresados where concatenados = '${concatenados}'`;
  let resultado_periodo_egresado = await connection.query(periodo_egresado, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  if (resultado_periodo_egresado.length == 0) {
    return res
      .status(200)
      .json(
        `No hay resultado del estudiante como egresado en la carrera: ${carrera}`
      );
  }

  return res.status(200).json({
    estudiante: resultado_estudiante_por_codigo[0],
    periodo: resultado_periodo_egresado[0].periodo,
  });
};

const registrar_libro_5 = async (req = request, res) => {
  const { nombres, observacion, periodo, fecha_emision, carrera } = req.body;

  let query_numero_correlativo = `SELECT * FROM libro_5 ORDER BY id DESC LIMIT 1`;
  let numero_correlativo = await connection.query(query_numero_correlativo, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  let num_correlativo = parseInt(numero_correlativo[0].numero_correlativo) + 1;

  let anio = new Date().toLocaleDateString("es-PE", { year: "2-digit" });

  if ((numero_correlativo.length = 0)) {
    let query_insert_libro_5 = `INSERT INTO libro_5 values (DEFAULT, '1', '1-${anio}','${nombres}','${carrera}','${periodo}','${fecha_emision}','${observacion}')`;

    let registro = await connection.query(query_insert_libro_5, {
      type: QueryTypes.INSERT,
      raw: false,
    });
    console.log(registro);
    return res.status(200).json("OK");
  }

  let query_insert_libro_5 = `INSERT INTO libro_5 values (DEFAULT, '${num_correlativo}', '${num_correlativo}-${anio}','${nombres}','${carrera}','${periodo}','${fecha_emision}','${observacion}')`;
  await connection.query(query_insert_libro_5, {
    type: QueryTypes.INSERT,
    raw: false,
  });
  return res.status(200).json({ msg: "Registro agregado" });
};

const filter_user_by_id = async (req = request, res) => {
  let { id } = req.params;

  try {
    let query_filter_user_by_id = `SELECT * FROM libro_6 where id = ${id}`;
    let filter_user_by_id = await connection.query(query_filter_user_by_id, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    return res.status(200).json(filter_user_by_id[0]);
  } catch (error) {
    return res.status(500).json({ msg: "ERROR EN EL SERVIDOR" });
  }
};

const actualizar_registro_libro_6 = async (req = request, res) => {
  let { id } = req.params;
  let {
    nombres,
    nombre_taller,
    fechaTaller,
    creditos,
    escuela_organizadora,
    observacion,
  } = req.body;

  try {
    await connection.query("SET SQL_SAFE_UPDATES = 0;", {
      type: QueryTypes.UPDATE,
      raw: false,
    });

    let query_update = `UPDATE libro_6 SET nombres = '${nombres}' , nombre_taller = '${nombre_taller}' , creditos = '${creditos}' , fecha_taller = '${fechaTaller}' , escuela_organizadora = '${escuela_organizadora}' , observacion = '${observacion}' WHERE id = ${id}`;

    await connection.query(query_update, {
      type: QueryTypes.UPDATE,
      raw: false,
    });

    return res.status(200).json({ msg: "Edicion completa" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al intentar actualizar el registro" });
  }
};

const filter_user = async (req = request, res) => {
  let { filtro } = req.body;

  try {
    let query_filter_user = `SELECT * FROM uma_alumnos WHERE nombres LIKE '%${filtro}%' OR paterno LIKE '%${filtro}%' OR materno LIKE '%${filtro}%' OR nomesp LIKE '%${filtro}%' OR codigo = '${filtro}' LIMIT 5`;

    let filter_user = await connection.query(query_filter_user, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    return res.status(200).json(filter_user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al intentar filtrar registros" });
  }
};

const registrar_libro_5_sys = async (req = request, res) => {
  let { carrera, periodo_egreso, apellidos, nombres, fecha_emision } = req.body;

  // periodo_egreso
  let anio = Number(periodo_egreso.split("-")[0]);
  let semestre = periodo_egreso.split("-")[1];

  if (periodo_egreso.split("-").length > 2) {
    return res.status(404).json({
      msg: `Formato incorrecto del periodo_egreso: ${periodo_egreso}`,
    });
  }

  if (isNaN(anio))
    return res
      .status(404)
      .json({ msg: `Formato incorrecto del periodo: ${periodo_egreso}` });
  if (semestre !== "II" && semestre !== "I")
    return res
      .status(404)
      .json({ msg: `Formato incorrecto del periodo: ${periodo_egreso}` });

  // fecha_emision
  let dia_emision = Number(fecha_emision.split("-")[0]);
  let mes_emision = Number(fecha_emision.split("-")[1]);
  let anio_emision = Number(fecha_emision.split("-")[2]);

  if (fecha_emision.split("-").length > 3) {
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });
  }

  if (isNaN(dia_emision))
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });

  if (isNaN(mes_emision))
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });

  if (isNaN(anio_emision))
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });

  let query_buscar_carrera = `SELECT nomesp FROM especialidad WHERE nomesp = '${carrera}'`;

  let buscar_carrera = await connection.query(query_buscar_carrera, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  if (buscar_carrera.length <= 0) {
    return res
      .status(404)
      .json({ message: "No existe la especialidad indicada" });
  }

  return res.status(200).json(req.body);
  // return res.status(200).json({message: 'Registro agregado correctamente'});
};

const test_registrar_libro_5_sys = async (req = request, res) => {
  let {
    carrera,
    periodo_egreso,
    apellidos,
    nombres,
    fecha_emision,
    observacion = "",
  } = req.body;

  let regex = /[0-9+$`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (regex.test(apellidos)) {
    return res.status(400).json({
      msg: `Los campos nombres y apellidos solo pueden contener letras`,
    });
  }

  if (regex.test(nombres)) {
    return res.status(400).json({
      msg: `Los campos nombres y apellidos solo pueden contener letras`,
    });
  }

  // periodo_egreso
  let anio = Number(periodo_egreso.split("-")[0]);
  let semestre = periodo_egreso.split("-")[1];

  if (periodo_egreso.split("-").length > 2) {
    return res.status(404).json({
      msg: `Formato incorrecto del periodo_egreso: ${periodo_egreso}`,
    });
  }

  if (isNaN(anio))
    return res
      .status(404)
      .json({ msg: `Formato incorrecto del periodo: ${periodo_egreso}` });
  if (semestre !== "II" && semestre !== "I")
    return res
      .status(404)
      .json({ msg: `Formato incorrecto del periodo: ${periodo_egreso}` });

  // fecha_emision
  let dia_emision = Number(fecha_emision.split("-")[0]);
  let mes_emision = Number(fecha_emision.split("-")[1]);
  let anio_emision = Number(fecha_emision.split("-")[2]);

  if (fecha_emision.split("-").length > 3) {
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });
  }

  if (isNaN(dia_emision))
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });

  if (isNaN(mes_emision))
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });

  if (isNaN(anio_emision))
    return res.status(404).json({
      msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
    });

  let query_buscar_carrera = `SELECT nomesp FROM especialidad WHERE nomesp = '${carrera}'`;

  let buscar_carrera = await connection.query(query_buscar_carrera, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  if (buscar_carrera.length <= 0) {
    return res
      .status(404)
      .json({ message: "No existe la especialidad indicada" });
  }

  try {
    let query_numero_correlativo = `SELECT * FROM libro_5 ORDER BY id DESC LIMIT 1`;
    let numero_correlativo = await connection.query(query_numero_correlativo, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    let num_correlativo =
      parseInt(numero_correlativo[0].numero_correlativo) + 1;

    let anio = new Date().toLocaleDateString("es-PE", { year: "2-digit" });

    let nombre_completo = `${apellidos}, ${nombres}`;
    let query_insert_libro_5 = `INSERT INTO libro_5_test values (DEFAULT, '${num_correlativo}', '${num_correlativo}-${anio}','${nombre_completo.toUpperCase()}','${carrera}','${periodo_egreso}','${fecha_emision}','${observacion}')`;
    await connection.query(query_insert_libro_5, {
      type: QueryTypes.INSERT,
      raw: false,
    });
    return res.status(200).json({ msg: "Registro agregado" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Ocurrio un problema al intentar agregar el registro!" });
  }

  // return res.status(200).json({message: 'Registro agregado correctamente'});
};

export {
  registrar_libro_6,
  data_libro_6,
  data_libro_5,
  data_alumnos,
  alumno_filtro_libro_5,
  registrar_libro_5,
  filter_user_by_id,
  actualizar_registro_libro_6,
  filter_user,
  registrar_libro_5_sys,
  test_registrar_libro_5_sys,
};
