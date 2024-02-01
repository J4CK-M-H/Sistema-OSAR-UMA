import { QueryTypes } from "sequelize";
import { connection } from "../db/database.js";
import XLSX from "xlsx";

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
    "select concat(nombres, ' ', paterno,' ' ,materno) as nombres,codigo,nomesp  from uma_alumnos";
  let resultado_uma_alumnos = await connection.query(query_uma_alumnos, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return res.status(200).json(resultado_uma_alumnos);
};

const data_alumnos_filtrados = async (req = request, res) => {
  const { filtro } = req.body;

  let query_uma_alumnos = `select concat(paterno, ' ', materno,' ' ,nombres) as nombres,codigo, nomesp, c_dni  from uma_alumnos WHERE nombres LIKE '%${filtro}%' OR paterno  LIKE '%${filtro}%' OR materno LIKE '%${filtro}%' OR c_dni LIKE '%${filtro}%' OR nomesp LIKE '%${filtro}%' OR nomesp LIKE '%${filtro}%' LIMIT 10 `;
  let resultado_uma_alumnos = await connection.query(query_uma_alumnos, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  console.log(query_uma_alumnos);
  return res.status(200).json(resultado_uma_alumnos);
};

export {
  registrar_libro_6,
  data_libro_6,
  data_libro_5,
  data_alumnos,
  data_alumnos_filtrados,
};
