import { useEffect, useRef, useState } from "react";
import { TiUploadOutline } from "react-icons/ti";
import { Dropdown } from "primereact/dropdown";
import { subirCSV } from "../../../helpers/subirArchivos";
import { useApi } from "../../hooks/useAxios";
import { FaFilter, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataTable } from "primereact/datatable";
import { Column, Row } from "jspdf-autotable";
import { ColumnGroup } from "primereact/columngroup";
import { AiFillFileExcel } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as xlsx from "xlsx";
import { InputText } from "primereact/inputtext";

export const ReportesSuneduMinedu = () => {
  // STATES
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [periodos, setPeriodos] = useState(null);
  const [reportePrepago, setReportePrepago] = useState([]);
  const [reporteSegEspecialidad, setReporteSegEspecialidad] = useState([]);
  const [reporteMaestria, setReporteMaestria] = useState([]);

  // FOOTER
  const [footerPrepagoRow, setFooterPrepagoRow] = useState([]);
  const [footerSegundaEspecialidadRow, setFooterSegundaEspecialidadRow] =
    useState([]);
  const [footerMaestriaRow, setFooterMaestriaRow] = useState([]);

  // LOADINGS
  const [loadingPeriodos, setLoadingPeriodos] = useState(true);
  const [loadingReportes, setLoadingReportes] = useState(true);

  // USE REFS
  const file = useRef(null);

  useEffect(() => {
    let parametros = JSON.parse(localStorage.getItem("parametros"));
    const obtener_periodos = async () => {
      setLoadingPeriodos(true);
      try {
        let { data } = await useApi("reportes/periodos_reporte");
        setPeriodos(data);
        setSelectedPeriodo({ periodo: parametros.periodo });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPeriodos(false);
      }
    };

    const obtener_reportes = async () => {
      try {
        let { data } = await useApi.post("reportes/reporte_sunedu_minedu", {
          periodo: parametros.periodo,
        });
        let footerPrepago = data.prepago.pop();
        let footerSegundaEspecialidad = data.segunda_especialidad.pop();
        let footerMaestria = data.maestria.pop();

        setFooterPrepagoRow([
          {
            carrera: footerPrepago.carrera,
            total: footerPrepago.total,
            hombre: footerPrepago.hombre,
            est_h: footerPrepago.est_h,
            mujer: footerPrepago.mujer,
            est_m: footerPrepago.est_m,
          },
        ]);

        setFooterSegundaEspecialidadRow([
          {
            carrera: footerSegundaEspecialidad.carrera,
            total: footerSegundaEspecialidad.total,
            hombre: footerSegundaEspecialidad.hombre,
            est_h: footerSegundaEspecialidad.est_h,
            mujer: footerSegundaEspecialidad.mujer,
            est_m: footerSegundaEspecialidad.est_m,
          },
        ]);

        setFooterMaestriaRow([
          {
            carrera: footerMaestria.carrera,
            total: footerMaestria.total,
            hombre: footerMaestria.hombre,
            est_h: footerMaestria.est_h,
            mujer: footerMaestria.mujer,
            est_m: footerMaestria.est_m,
          },
        ]);

        setReportePrepago(data.prepago);
        setReporteSegEspecialidad(data.segunda_especialidad);
        setReporteMaestria(data.maestria);

        // ACUMULADOS
        // setAcumuladoReportePrepago(prepado_acumulado(data.prepagos));
        // setAcumuladoReporteMaestria(maestria_acumulado(data.maestrias));
        // setAcumuladoReporteSegEspecialidad(segunda_especialidad_acumulado(data.segunda_especialidad));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingReportes(false);
      }
    };

    obtener_periodos();
    obtener_reportes();
  }, []);

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
      })
    );

    try {
      let { data } = await useApi.post(`/reportes/reporte_sunedu_minedu`, {
        periodo,
      });
      let footerPrepago = data.prepago.pop();
      let footerSegundaEspecialidad = data.segunda_especialidad.pop();
      let footerMeastria = data.maestria.pop();

      setFooterPrepagoRow([
        {
          carrera: footerPrepago.carrera,
          total: footerPrepago.total,
          hombre: footerPrepago.hombre,
          est_h: footerPrepago.est_h,
          mujer: footerPrepago.mujer,
          est_m: footerPrepago.est_m,
        },
      ]);

      setFooterSegundaEspecialidadRow([
        {
          carrera: footerSegundaEspecialidad.carrera,
          total: footerSegundaEspecialidad.total,
          hombre: footerSegundaEspecialidad.hombre,
          est_h: footerSegundaEspecialidad.est_h,
          mujer: footerSegundaEspecialidad.mujer,
          est_m: footerSegundaEspecialidad.est_m,
        },
      ]);

      setFooterMaestriaRow([
        {
          carrera: footerMeastria.carrera,
          total: footerMeastria.total,
          hombre: footerMeastria.hombre,
          est_h: footerMeastria.est_h,
          mujer: footerMeastria.mujer,
          est_m: footerMeastria.est_m,
        },
      ]);

      setReportePrepago(data.prepago);
      setReporteSegEspecialidad(data.segunda_especialidad);
      setReporteMaestria(data.maestria);
      // // ACUMULADOS
      // setAcumuladoReportePrepago(prepado_acumulado(data.prepagos));
      // setAcumuladoReporteSegEspecialidad(
      //   segunda_especialidad_acumulado(data.segunda_especialidad)
      // );
      // setAcumuladoReporteMaestria(maestria_acumulado(data.maestrias));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReportes(false);
    }
  };

  const columnsPrepago = [
    { field: "carrera", header: "" },
    { field: "total", header: "TOTAL" },
    { field: "hombre", header: " HOMBRE" },
    { field: "est_h", header: "HOMBRE %" },
    { field: "mujer", header: "MUJER" },
    { field: "est_m", header: "MUJER %" },
  ];

  if (loadingReportes) return;

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

  const exportarExcelPrepago = async (reporte, footerRow) => {
    const worksheet = xlsx.utils.json_to_sheet(reporte);

    let data_con_totales = xlsx.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "TOTAL",
          footerRow[0].total,
          footerRow[0].hombre,
          footerRow[0].est_h,
          footerRow[0].mujer,
          footerRow[0].est_m,
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

  const exportPdf = async (reporte, columnas, footerRow) => {
    let columnasPDFPrepago = columnas.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    const doc = new jsPDF("p", "pt", "letter");
    let filas = [
      ...reporte,
      {
        carrera: "TOTAL",
        total: footerRow[0].total,
        hombre: footerRow[0].hombre,
        est_h: footerRow[0].est_h,
        mujer: footerRow[0].mujer,
        est_m: footerRow[0].est_m,
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
        cellPadding: 3,
        minCellHeight: 6,
      },
      headStyles: {
        fillColor: [255, 7, 48],
        textColor: [255, 255, 255],
        fontSize: 8,
        padding: 0,
      },
    });
    doc.save(`ReporteOSAR-${Date.now()}.pdf`);
  };

  const footerGroupPrepago = (
    <ColumnGroup>
      <Row>
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerPrepagoRow[0].carrera}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerPrepagoRow[0].total}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerPrepagoRow[0].hombre}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerPrepagoRow[0].est_h}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerPrepagoRow[0].mujer}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerPrepagoRow[0].est_m}
        />
      </Row>
    </ColumnGroup>
  );

  const templateHeader = (reporte, columnas, footerRow) => (
    <div className="flex justify-between items-center">
      <div className="space-x-1 flex">
        <button
          onClick={() => exportarExcelPrepago(reporte, footerRow)}
          className="w-[40px] h-[40px] bg-green-600 text-white flex items-center justify-center rounded-full"
        >
          <AiFillFileExcel size={20} />
        </button>
        <button
          onClick={() => exportPdf(reporte, columnas, footerRow)}
          className="w-[40px] h-[40px] bg-red-500 text-white flex items-center justify-center rounded-full"
        >
          <FaRegFilePdf size={20} />
        </button>
      </div>
      {/* <div className="p-inputgroup w-[250px]">
        <span className="p-inputgroup-addon">
          <FaFilter />
        </span>
        <InputText
          type="search"
          value={globalFilter}
          onChange={globalFilterAction}
          placeholder="Filtro global"
        />
      </div> */}
    </div>
  );

  const footerGroupSegundaEspecialidad = (
    <ColumnGroup>
      <Row>
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerSegundaEspecialidadRow[0].carrera}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerSegundaEspecialidadRow[0].total}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerSegundaEspecialidadRow[0].hombre}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerSegundaEspecialidadRow[0].est_h}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerSegundaEspecialidadRow[0].mujer}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerSegundaEspecialidadRow[0].est_m}
        />
      </Row>
    </ColumnGroup>
  );

  const footerGroupMaestria = (
    <ColumnGroup>
      <Row>
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerMaestriaRow[0].carrera}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerMaestriaRow[0].total}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerMaestriaRow[0].hombre}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerMaestriaRow[0].est_h}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerMaestriaRow[0].mujer}
        />
        <Column
          className="text-center font-extrabold bg-[#F3EEEA] border-red-300"
          footer={footerMaestriaRow[0].est_m}
        />
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Reporte Sunedu-Minedu</h2>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(event) => subirCSV(event, file)}
      >
        <input
          type="file"
          ref={file}
          name="archivo"
          className="block w-full border bg-gray-50 border-gray-300 rounded-md h-12 file:h-full file:bg-green-700 file:text-white file:border-none file:px-4 cursor-pointer file:cursor-pointer dark:text-gray-400"
        />
        <button className="flex w-full bg-green-600 text-white py-2 rounded-sm items-center justify-center gap-x-2">
          {/* <TbCsv size={30} className="w-full"/> */}
          <TiUploadOutline />
          Subir CSV
        </button>
      </form>
      <div className="flex gap-x-8 justify-end">
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
          className="bg-rose-700 text-white px-4 flex items-center gap-x-2 rounded-sm h-11 self-end"
        >
          <FaSearch />
          Buscar
        </button>
      </div>

      <div className="card">
        <Accordion multiple activeIndex={[0]} className="space-y-8">
          {/* TABLA PREGRADO */}
          <AccordionTab header="Prepago">
            <div className="card">
              <DataTable
                loading={loadingReportes}
                header={() =>
                  templateHeader(
                    reportePrepago,
                    columnsPrepago,
                    footerPrepagoRow
                    // globalFilterValuePrepago,
                    // onGlobalFilterChangePrepago
                  )
                }
                // filters={filtersPrepago}
                value={reportePrepago}
                showGridlines
                footerColumnGroup={footerGroupPrepago}
                // globalFilterFields={["CARRERA"]}
                id="my-table"
              >
                {columnsPrepago.map((col, index) => (
                  <Column
                    className={`${
                      index == 0 && "bg-rose-700 text-white font-bold"
                    } text-center }`}
                    key={index}
                    field={col.field}
                    header={col.header}
                    headerClassName="bg-rose-700 text-white text-xs text-center"
                  />
                ))}
              </DataTable>
            </div>
          </AccordionTab>
          {/* TABLA PREGRADO */}

          {/* TABLA SEGUNDA ESPECIALIDAD */}
          <AccordionTab header="Segunda Especialidad">
            <div className="card">
              <DataTable
                loading={loadingReportes}
                header={() =>
                  templateHeader(
                    reporteSegEspecialidad,
                    columnsPrepago,
                    footerSegundaEspecialidadRow
                    // globalFilterValuePrepago,
                    // onGlobalFilterChangePrepago
                  )
                }
                // filters={filtersPrepago}
                value={reporteSegEspecialidad}
                showGridlines
                footerColumnGroup={footerGroupSegundaEspecialidad}
                // globalFilterFields={["CARRERA"]}
                id="my-table"
              >
                {columnsPrepago.map((col, index) => (
                  <Column
                    className={`${
                      index == 0 && "bg-rose-700 text-white font-bold"
                    } text-center }`}
                    key={index}
                    field={col.field}
                    header={col.header}
                    headerClassName="bg-rose-700 text-white text-xs text-center"
                  />
                ))}
              </DataTable>
            </div>
          </AccordionTab>
          {/* TABLA SEGUNDA ESPECIALIDAD */}

          {/* TABLA MAESTRIA */}
          <AccordionTab header="Maestria">
            <div className="card">
              <DataTable
                loading={loadingReportes}
                header={() =>
                  templateHeader(
                    reporteMaestria,
                    columnsPrepago,
                    footerMaestriaRow
                    // globalFilterValuePrepago,
                    // onGlobalFilterChangePrepago
                  )
                }
                // filters={filtersPrepago}
                value={reporteMaestria}
                showGridlines
                footerColumnGroup={footerGroupMaestria}
                // globalFilterFields={["CARRERA"]}
                id="my-table"
              >
                {columnsPrepago.map((col, index) => (
                  <Column
                    className={`${
                      index == 0 && "bg-rose-700 text-white font-bold"
                    } text-center }`}
                    key={index}
                    field={col.field}
                    header={col.header}
                    headerClassName="bg-rose-700 text-white text-xs text-center"
                  />
                ))}
              </DataTable>
            </div>
          </AccordionTab>
          {/* TABLA MAESTRIA */}
        </Accordion>
      </div>
    </div>
  );
};
