import { QueryTypes } from "sequelize";
import XLSX from "xlsx";
import { connection } from "../db/database.js";

const cargar_archivo_csv = async (req = request, res) => {
  if (req.files) {
    let excel = req.files.file;
    let date = Date.now();
    await excel.mv("./uploads/" + `${date}` + excel.name);
    let book = XLSX.readFile("./uploads/" + `${date}` + excel.name);
    let sheet_name_list = book.SheetNames;

    // CONVETIRMOS LA DATA EN JSON PARA REGISTRARLO EN LA BD
    let data = XLSX.utils.sheet_to_json(book.Sheets[sheet_name_list[0]]);
    console.log(data);
  }
};

const cargar_libro_6 = async (req = request, res) => {
  if (req.files) {
    let excel = req.files.file;
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
      console.log("vacio!!");
      data.forEach(async (registro) => {
        console.log(registro.Nombre);
        console.log(registro["PARTICIPACIÓN"]);
        numero_folio_vacio = numero_folio_vacio + 1;
        let query_libro_6 = `INSERT INTO libro_6 VALUES (DEFAULT, '${numero_folio_vacio}','${registro.Nombre}','${registro['PARTICIPACIÓN']}','${registro['Nombre del taller']}','${registro['Créditos']}','${registro['Fecha del taller']}','${registro['Escuela organizadora']}','${registro['Fecha de emisión']}','${(registro['Observación'] == undefined || registro['Observación'] == null) ? 'Vacio': registro['Observación']}')`;

        await connection.query(query_libro_6, {
          type: QueryTypes.INSERT,
          raw: false,
        });

        console.log(numero_folio_vacio);
      });

      return res.status(200).json({ msg: "REGISTRO COMPLETO" });
    }
    numero_folio_lleno = `${parseInt(parseInt(ultimo_folio[0].numero_folio))}`;
    data.forEach(async (registro) => {
      numero_folio_lleno++;
      let query_libro_6 = `INSERT INTO libro_6_copy VALUES (DEFAULT, '${numero_folio_lleno}','${registro.nombre}','${registro.participacion}','${registro.nombre_del_taller}','${registro.creditos}','${registro.fecha_del_taller}','${registro.escuela_organizadora}','${registro.fecha_de_emision}','${(registro['Observación'] == undefined || registro['Observación'] == null) ? 'Vacio': registro['Observación']}')`;

      await connection.query(query_libro_6, {
        type: QueryTypes.INSERT,
        raw: false,
      });
    });
    return res.status(200).json({ msg: "REGISTRO COMPLETO" });
  }
};

export { cargar_archivo_csv, cargar_libro_6 };
