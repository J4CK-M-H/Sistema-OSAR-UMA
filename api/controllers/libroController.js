import { QueryTypes } from "sequelize";
import { connection } from "../db/database.js";
import XLSX from "xlsx";
import { request } from "express";

const data_libro_6 = async (req = request, res) => {
  let query_libro_6 = "SELECT * FROM libro_6";
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
    await excel.mv("./uploads/" + `${date}` + excel.name);
    let book = XLSX.readFile("./uploads/" + `${date}` + excel.name);
    let sheet_name_list = book.SheetNames;

    // CONVETIRMOS LA DATA EN JSON PARA REGISTRARLO EN LA BD
    let data = XLSX.utils.sheet_to_json(book.Sheets[sheet_name_list[0]]);

    let query_ultimo_folio =
      "SELECT numero_folio FROM libro_6 ORDER BY id DESC LIMIT 1";
    let ultimo_folio = await connection.query(query_ultimo_folio, {
      type: QueryTypes.SELECT,
      raw: false,
    });

    let numero_folio_lleno = 0;
    let numero_folio_vacio = 0;

    if (ultimo_folio.length == "0") {
      data.forEach(async (registro) => {
        numero_folio_vacio = numero_folio_vacio + 1;
        let query_libro_6 = `INSERT INTO libro_6 VALUES (DEFAULT, '${numero_folio_vacio}','${registro.Nombre}','${participacion}','${nombreTaller}','${creditos}','${fechaTaller}','${escuelaOrganizadora}','${fechaEmision}','')`;

        await connection.query(query_libro_6, {
          type: QueryTypes.INSERT,
          raw: false,
        });
      });
      return res.status(200).json({ msg: "REGISTRO COMPLETO" });
    }

    numero_folio_lleno = `${parseInt(parseInt(ultimo_folio[0].numero_folio))}`;
    data.forEach(async (registro) => {
      numero_folio_lleno++;
      let query_libro_6 = `INSERT INTO libro_6 VALUES (DEFAULT, '${numero_folio_lleno}','${registro.Nombre}','${participacion}','${nombreTaller}','${creditos}','${fechaTaller}','${escuelaOrganizadora}','${fechaEmision}','')`;

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
        `No hay resultado del estudiante como egresa en la carrera: ${carrera}`
      );
  }

  return res.status(200).json({
    estudiante: resultado_estudiante_por_codigo[0],
    periodo: resultado_periodo_egresado[0].periodo,
  });
};

const registrar_libro_5 = async (req = request, res) => {
  const { nombres, observacion, periodo, fecha_emision, carrera } = req.body;

  console.log(req.body);
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
    return res.status(500).json({msg: "ERROR EN EL SERVIDOR"})    
  }

};

export {
  registrar_libro_6,
  data_libro_6,
  data_libro_5,
  data_alumnos,
  alumno_filtro_libro_5,
  registrar_libro_5,
  filter_user_by_id,
};
