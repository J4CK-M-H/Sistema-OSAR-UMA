import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useApi } from "../../hooks/useAxios";
import { InputText } from "primereact/inputtext";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { AiFillFileExcel } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as xlsx from "xlsx";

import {
  maestria_acumulado,
  prepado_acumulado,
  segunda_especialidad_acumulado,
} from "../../../helpers/reporteAcumulados";
import { FilterMatchMode } from "primereact/api";

export const ReportesUmaAlumnos = () => {
  const [radioOption, setRadioOption] = useState("M");
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

  const [periodos, setPeriodos] = useState(null);

  // PARAMETROS DEFAULT DEFINIDOS
  const [parametros, setParametros] = useState({
    periodo: 0,
    radioOption: "",
  });

  // LOADING
  const [loadingPeriodos, setLoadingPeriodos] = useState(true);
  const [loadingReportes, setLoadingReportes] = useState(true);

  // REPORTES
  const [reportePrepago, setReportePrepago] = useState([]);
  const [reporteMaestria, setReporteMaestria] = useState([]);
  const [reporteSegEspecialidad, setReporteSegEspecialidad] = useState([]);

  // REPORTES ACUMULADOS
  const [AcumuladoReportePrepago, setAcumuladoReportePrepago] = useState([]);
  const [AcumuladoReporteMaestria, setAcumuladoReporteMaestria] = useState([]);
  const [AcumuladoReporteSegEspecialidad, setAcumuladoReporteSegEspecialidad] =
    useState([]);

  // FILTERS
  const [filtersPrepago, setFiltersPrepago] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [filtersSegundaEspecialidad, setFiltersSegundaEspecialidad] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [filtersMaestria, setFiltersMaestria] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValuePrepago, setGlobalFilterValuePrepago] = useState([]);
  const [
    globalFilterValueSegundaEspecialidad,
    setGlobalFilterValueSegundaEspecialidad,
  ] = useState([]);
  const [globalFilterValueMaestria, setGlobalFilterValueMaestria] = useState(
    []
  );

  let copyBtn = document.querySelector("#copy_btn");
  const copy = () => {
    // let copyText = document.querySelector("#my-table");
    // copyText.select();
    // document.execCommand("copy");
  };

  const onGlobalFilterChangePrepago = (e) => {
    const value = e.target.value;
    let _filters = { ...filtersPrepago };

    _filters["global"].value = value;

    setFiltersPrepago(_filters);
    setGlobalFilterValuePrepago(value);
  };

  const onGlobalFilterChangeSegundaEspecialidad = (e) => {
    const value = e.target.value;
    let _filters = { ...filtersSegundaEspecialidad };

    _filters["global"].value = value;

    setFiltersSegundaEspecialidad(_filters);
    setGlobalFilterValueSegundaEspecialidad(value);
  };

  const onGlobalFilterChangeMaestria = (e) => {
    const value = e.target.value;
    let _filters = { ...filtersMaestria };

    _filters["global"].value = value;

    setFiltersMaestria(_filters);
    setGlobalFilterValueMaestria(value);
  };

  const columnsPrepago = [
    { field: "CARRERA", header: "" },
    { field: "CICLO1", header: "  CICLO I" },
    { field: "CICLO2", header: "  CICLO II" },
    { field: "CICLO3", header: "  CICLO III" },
    { field: "CICLO4", header: "  CICLO IV" },
    { field: "CICLO5", header: "  CICLO V" },
    { field: "CICLO6", header: "  CICLO VI" },
    { field: "CICLO7", header: "  CICLO VII" },
    { field: "CICLO8", header: "  CICLO VIII" },
    { field: "CICLO9", header: "  CICLO IX" },
    { field: "CICLO10", header: " CICLO X" },
    { field: "TOTAL", header: " TOTAL" },
  ];

  const columnsSegundaEspecialidad = [
    { field: "CARRERA", header: "" },
    { field: "CICLO1", header: "  CICLO I" },
    { field: "CICLO2", header: "  CICLO II" },
    { field: "CICLO3", header: "  CICLO III" },
    { field: "TOTAL", header: " TOTAL" },
  ];

  const columnsMaestria = [
    { field: "CARRERA", header: "" },
    { field: "CICLO1", header: "  CICLO I" },
    { field: "CICLO2", header: "  CICLO II" },
    { field: "CICLO3", header: "  CICLO III" },
    { field: "CICLO4", header: "  CICLO IV" },
    { field: "TOTAL", header: " TOTAL" },
  ];

  useEffect(() => {
    obtener_periodos();
    obtener_reportes();
  }, []);

  const obtener_periodos = async () => {
    let parametros = JSON.parse(localStorage.getItem("parametros"));
    setLoadingPeriodos(true);

    try {
      let { data } = await useApi("reportes/periodos_reporte");
      setPeriodos(data);
      setSelectedPeriodo({ periodo: parametros.periodo });
      setRadioOption(parametros.radioOption);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPeriodos(false);
    }
  };

  const obtener_reportes = async () => {
    let parametros = JSON.parse(localStorage.getItem("parametros"));
    const token = JSON.parse(localStorage.getItem("user"));
    
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    try {
      let { data } = await useApi.post("reportes/general", { ...parametros }, config);
      setReportePrepago(data.prepagos);
      setReporteSegEspecialidad(data.segunda_especialidad);
      setReporteMaestria(data.maestrias);

      // ACUMULADOS
      setAcumuladoReportePrepago(prepado_acumulado(data.prepagos));
      setAcumuladoReporteMaestria(maestria_acumulado(data.maestrias));
      setAcumuladoReporteSegEspecialidad(
        segunda_especialidad_acumulado(data.segunda_especialidad)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReportes(false);
    }
  };

  // REPORTE PDF

  const exportPdf = async (reporte, acumulados, columnas) => {
    let columnasPDFPrepago = columnas.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    const doc = new jsPDF("p", "pt", "letter");
    let filas = [
      ...reporte,
      {
        CARRERA: "TOTAL",
        CICLO1: acumulados[0],
        CICLO2: acumulados[1],
        CICLO3: acumulados[2],
        CICLO4: acumulados[3],
        CICLO5: acumulados[4],
        CICLO6: acumulados[5],
        CICLO7: acumulados[6],
        CICLO8: acumulados[7],
        CICLO9: acumulados[8],
        CICLO10: acumulados[9],
        TOTAL: acumulados[10],
      },
    ];

    await doc.autoTable(columnasPDFPrepago, filas, {
      margin: { top: 100 },
      tableLineColor: [189, 195, 199],
      tableLineWidth: 0.75,
      bodyStyles: { lineColor: [189, 195, 199] },
      theme: "grid",
      styles: {
        fontSize: 8,
        font: "helvetica",
        cellPadding: 6,
        minCellHeight: 6,
      },
      headStyles: {
        fillColor: [255, 7, 48],
        textColor: [255, 255, 255],
        fontSize: 8,
        padding: 0,
      },
    });
    doc.save("ReporteOSAR.pdf");
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const exportarExcelPrepago = async (reporte, acumulados) => {
    const worksheet = xlsx.utils.json_to_sheet(reporte);
    let totales = [];
    acumulados.forEach((total) => {
      totales.push(total);
    });

    let data_con_totales = xlsx.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "TOTAL",
          ...totales,
          // acumulado[0],
          // acumulado[1],
          // acumulado[2],
          // acumulado[3],
          // acumulado[4],
          // acumulado[5],
          // acumulado[6],
          // acumulado[7],
          // acumulado[8],
          // acumulado[9],
          // acumulado[10],
        ],
      ],
      { origin: -1 }
    );
    const workbook = {
      Sheets: { data: data_con_totales },
      SheetNames: ["data"],
    };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // xlsx.writeFile(workbook)

    saveAsExcelFile(excelBuffer, "tabla");
  };

  const templateHeader = (
    reporte,
    acumulado,
    columnas,
    globalFilter,
    globalFilterAction
  ) => (
    <div className="flex justify-between items-center">
      <div className="space-x-1 flex">
        <button
          onClick={() => exportarExcelPrepago(reporte, acumulado)}
          className="py-2 px-4 bg-green-600 text-white rounded-sm flex items-center"
        >
          <AiFillFileExcel />
          Excel
        </button>
        <button
          onClick={() => exportPdf(reporte, acumulado, columnas)}
          className="py-2 px-4 bg-red-500 text-white rounded-sm flex items-center"
        >
          <FaFilePdf />
          Pdf
        </button>
        <button id="copy_btn" onClick={copy}>
          Copy
        </button>
      </div>
      <div className="p-inputgroup w-[250px]">
        <span className="p-inputgroup-addon">
          <FaFilter />
        </span>
        <InputText
          type="search"
          value={globalFilter}
          onChange={globalFilterAction}
          placeholder="Filtro global"
        />
      </div>
    </div>
  );

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Total"
          footerStyle={{ textAlign: "center" }}
          className="border-red-300"
        />
        {AcumuladoReportePrepago.map((acumulado, index) => (
          <Column
            key={index}
            className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
            footer={acumulado}
          />
        ))}
      </Row>
    </ColumnGroup>
  );

  const footerGroupSegundaEspecialidad = (
    <ColumnGroup>
      <Row>
        <Column
          footer="TOTAL"
          footerStyle={{ textAlign: "center", backgroundColor: "#F3EEEA" }}
          className="border-red-300"
        />
        {AcumuladoReporteSegEspecialidad.map((acumulado, index) => (
          <Column
            key={index}
            className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
            footer={acumulado}
          />
        ))}
      </Row>
    </ColumnGroup>
  );

  const footerGroupMaestria = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Total"
          footerStyle={{ textAlign: "center" }}
          className="border-red-300"
        />
        {AcumuladoReporteMaestria.map((acumulado, index) => (
          <Column
            key={index}
            className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
            footer={acumulado}
          />
        ))}
      </Row>
    </ColumnGroup>
  );

  const buscarPeriodo = async () => {
    if (selectedPeriodo == null) {
      alert("SELECCIONE UN PERIODO");
      return;
    }

    let periodo = selectedPeriodo.periodo;

    localStorage.setItem(
      "parametros",
      JSON.stringify({
        periodo,
        radioOption,
      })
    );

    try {
      let { data } = await useApi.post(`/reportes/general-by-periodo-estado`, {
        periodo,
        radioOption,
      });
      console.log(data);
      setReportePrepago(data.prepagos);
      setReporteSegEspecialidad(data.segunda_especialidad);
      setReporteMaestria(data.maestrias);

      // console.log(data)
      // ACUMULADOS
      setAcumuladoReportePrepago(prepado_acumulado(data.prepagos));
      setAcumuladoReporteSegEspecialidad(
        segunda_especialidad_acumulado(data.segunda_especialidad)
      );
      setAcumuladoReporteMaestria(maestria_acumulado(data.maestrias));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-transparent">
      <h2 className="text-3xl font-bold">Reporte Alumnos</h2>
      <div className="flex items-end gap-x-8 justify-end mb-5">
        <div className="flex gap-x-3">
          <div className="space-x-2">
            <RadioButton
              name="opcion"
              value={"M"}
              inputId="radio_matriculados"
              onChange={(event) => setRadioOption(event.value)}
              checked={radioOption === "M"}
            />
            <label htmlFor="radio_matriculados">Matriculados</label>
          </div>
          <div className="space-x-2">
            <RadioButton
              name="opcion"
              value={"R"}
              inputId="radio_retirados"
              onChange={(event) => setRadioOption(event.value)}
              checked={radioOption === "R"}
            />
            <label htmlFor="radio_retirados">Retirados</label>
          </div>
        </div>

        <div>
          <label htmlFor="periodo" className="block">
            Periodo
          </label>
          <Dropdown
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.value)}
            options={periodos}
            optionLabel="periodo"
            placeholder="Seleccione un periodo"
            emptyFilterMessage="No hay resultados"
            className="w-[250px] selectedContainer"
            filter
            disabled={loadingPeriodos}
          />
        </div>

        <button
          onClick={buscarPeriodo}
          className="bg-rose-700 text-white px-4 flex items-center gap-x-2 rounded-sm h-11"
        >
          <FaSearch />
          Buscar
        </button>
      </div>

      <div className="card">
        <Accordion multiple activeIndex={[0]} className="space-y-8">
          <AccordionTab header="Prepago">
            <div className="card">
              <DataTable
                header={() =>
                  templateHeader(
                    reportePrepago,
                    AcumuladoReportePrepago,
                    columnsPrepago,
                    globalFilterValuePrepago,
                    onGlobalFilterChangePrepago
                  )
                }
                filters={filtersPrepago}
                value={reportePrepago}
                showGridlines
                footerColumnGroup={footerGroup}
                globalFilterFields={["CARRERA"]}
                id="my-table"
              >
                {columnsPrepago.map((col, index) => (
                  <Column
                    className={`${
                      index == 0 && "bg-rose-700 text-white font-bold"
                    } text-center  ${
                      index == 11 && "border-red-300 font-extrabold"
                    }`}
                    key={index}
                    field={col.field}
                    header={col.header}
                    headerClassName="bg-rose-700 text-white text-xs text-center"
                  />
                ))}
              </DataTable>
            </div>
          </AccordionTab>
          <AccordionTab header="Segunda Especialidad">
            <div className="card">
              <DataTable
                header={() =>
                  templateHeader(
                    reporteSegEspecialidad,
                    AcumuladoReporteSegEspecialidad,
                    columnsSegundaEspecialidad,
                    globalFilterValueSegundaEspecialidad,
                    onGlobalFilterChangeSegundaEspecialidad
                  )
                }
                filters={filtersSegundaEspecialidad}
                value={reporteSegEspecialidad}
                showGridlines
                footerColumnGroup={footerGroupSegundaEspecialidad}
              >
                {columnsSegundaEspecialidad.map((col, index) => (
                  <Column
                    className={`${
                      index == 0 && "bg-rose-700 text-white font-bold"
                    } text-center ${
                      index == 4 && "border-red-300 font-extrabold"
                    }`}
                    key={index}
                    field={col.field}
                    header={col.header}
                    headerClassName="bg-rose-700 text-white text-xs text-center"
                  />
                ))}
              </DataTable>
            </div>
          </AccordionTab>
          <AccordionTab header="Maestria">
            <div className="card">
              <DataTable
                header={() =>
                  templateHeader(
                    reporteMaestria,
                    AcumuladoReporteMaestria,
                    columnsMaestria,
                    globalFilterValueMaestria,
                    onGlobalFilterChangeMaestria
                  )
                }
                filters={filtersMaestria}
                value={reporteMaestria}
                showGridlines
                footerColumnGroup={footerGroupMaestria}
              >
                {columnsMaestria.map((col, index) => (
                  <Column
                    className={`${
                      index == 0 && "bg-rose-700 text-white font-bold"
                    } text-center ${
                      index == 5 && "border-red-300 font-extrabold"
                    }`}
                    key={index}
                    field={col.field}
                    header={col.header}
                    headerClassName="bg-rose-700 text-white text-xs text-center"
                  />
                ))}
              </DataTable>{" "}
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};
