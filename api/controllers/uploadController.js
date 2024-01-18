import XLSX from "xlsx";

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

export { cargar_archivo_csv };
