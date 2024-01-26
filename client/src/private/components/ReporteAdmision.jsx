import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { FaSearch } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { MultiSelect } from "primereact/multiselect";

const meses = [
  { id: 1, mes: "enero" },
  { id: 2, mes: "febrero" },
  { id: 3, mes: "marzo" },
  { id: 4, mes: "abril" },
  { id: 5, mes: "mayo" },
  { id: 6, mes: "junio" },
  { id: 7, mes: "julio" },
  { id: 8, mes: "agosto" },
  { id: 9, mes: "septiembre" },
  { id: 10, mes: "octubre" },
  { id: 11, mes: "noviembre" },
  { id: 12, mes: "diciembre" },
];

const columns = [
  { field: "carrera", header: "carrera" },
  { field: "rsem1", header: "Real sem 1" },
  { field: "psem1", header: "proy. semana 1" },
  { field: "lsem1", header: "logro semana 1" },
  { field: "rsem2", header: "Real sem 2" },
  { field: "psem2", header: "proy. semana 2" },
  { field: "lsem2", header: "logro semana 2" },
  { field: "rsem3", header: "Real sem 3" },
  { field: "psem3", header: "proy. semana 3" },
  { field: "lsem3", header: "logro semana 3" },
  { field: "rsem4", header: "Real sem 4" },
  { field: "psem4", header: "proy. semana 4" },
  { field: "lsem4", header: "logro semana 4" },
  { field: "rtotalmes", header: "Real Total Mes" },
  { field: "ptotalmes", header: "Proy. Total Mes" },
  { field: "ltotalmes", header: "Logro total mes" },
  { field: "ltotalcamp", header: "Logro total campaña" },
  { field: "rtotalcamp", header: "Real Total Camp" },
  { field: "ptotalcamp", header: "Proy. Total Campaña" },
];

const anios = [{ id: 1, anio: "2023" }];

export const ReporteAdmision = () => {
  const [direccion, setDireccion] = useState(false);

  const [periodos, setPeriodos] = useState([]);
  const [reporteAdmision, setReporteAdmision] = useState(null);
  const [leads, setLeads] = useState([]);

  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [selectedMes, setSelectedMes] = useState(null);
  const [selectedAnio, setSelectedAnio] = useState(null);
  const [radioButton, setRadioButton] = useState(null);

  const [visibleColumns, setVisibleColumns] = useState(columns);

  const [leadMatriculados, setLeadsMatriculados] = useState([]);
  const [leadInscritos, setLeadsInscritos] = useState([]);

  const [E2Lead, setE2Lead] = useState({});
  const [E3Lead, setE3Lead] = useState({});
  const [E5Lead, setE5Lead] = useState({});
  const [S1Lead, setS1Lead] = useState({});
  const [S2Lead, setS2Lead] = useState({});
  const [S3Lead, setS3Lead] = useState({});
  const [S4Lead, setS4Lead] = useState({});
  const [S5Lead, setS5Lead] = useState({});
  const [S6Lead, setS6Lead] = useState({});

  useEffect(() => {
    const get_periodos = async () => {
      try {
        let { data } = await useApi("admision/reporte_admision/get_periodos");
        setPeriodos(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    get_periodos();
  }, []);

  const buscar_reporte_admision = async () => {
    if (
      selectedAnio === null ||
      selectedMes === null ||
      selectedPeriodo === null ||
      radioButton === null
    ) {
      return alert("Seleccione todos los filtros");
    }

    try {
      let { data } = await useApi.post(
        `admision/reporte_admision/reporte_general`,
        {
          anio: selectedAnio,
          mes: selectedMes,
          periodo: selectedPeriodo,
          option: radioButton,
        }
      );
      setReporteAdmision(data.reporte_general);
      setLeadsMatriculados(data.leads_matriculados);
      setLeadsInscritos(data.leads_inscritos);
      setE2Lead(data.leads_matriculados[0]);
      setE3Lead(data.leads_matriculados[1]);
      setS1Lead(data.leads_matriculados[2]);
      setS2Lead(data.leads_matriculados[3]);
      setE5Lead(data.leads_matriculados[4]);
      setS3Lead(data.leads_matriculados[5]);
      setS4Lead(data.leads_matriculados[6]);
      setS6Lead(data.leads_matriculados[7]);
      setS5Lead(data.leads_matriculados[8]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(table_admision);

  const scroll = () => {
    let table_admision = document.querySelector(
      "#table_admision .p-datatable-wrapper"
    );

    setDireccion(!direccion);
    if (!direccion) {
      table_admision.scrollLeft += 800;
    } else {
      table_admision.scrollLeft -= 800;
    }
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const header = (
    <MultiSelect
      value={visibleColumns}
      options={columns}
      optionLabel="header"
      onChange={onColumnToggle}
      className="w-full sm:w-20rem"
      display="chip"
    />
  );

  const changeLead = async (event, rowData) => {
    console.log(rowData.siglas);

    switch (rowData.siglas) {
      case "E2":
        setE2Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${E2Lead.id}`,
            { siglas: E2Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "E3":
        setE3Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${E3Lead.id}`,
            { siglas: E3Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "S1":
        setS1Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${S1Lead.id}`,
            { siglas: S1Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "S2":
        setS2Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${S2Lead.id}`,
            { siglas: S2Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "E5":
        setE5Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${E5Lead.id}`,
            { siglas: E5Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "S3":
        setS3Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${S3Lead.id}`,
            { siglas: S3Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "S4":
        setS4Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${S4Lead.id}`,
            { siglas: S4Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "S5":
        setS5Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${S5Lead.id}`,
            { siglas: S5Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      case "S6":
        setS6Lead({
          id: rowData.idproy,
          siglas: rowData.siglas,
          valor_lead: event.target.value,
        });
        try {
          let { data } = await useApi.post(
            `admision/reporte_admision/update_lead/${S6Lead.id}`,
            { siglas: S6Lead.siglas, valor_lead: event.target.value }
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          buscar_reporte_admision();
        }
        return;
      default:
        0;
        return;
    }
  };

  const templateLead = (rowData) => {
    // changeLead(event,rowData);
    return (
      <input
        type="number"
        className="px-4 py-2 rounded-sm border border-slate-300 outline-none"
        id={`${rowData.idproy}`}
        onChange={(event) => changeLead(event, rowData)}
        value={
          (rowData.siglas == "E2" && E2Lead.valor_lead) ||
          (rowData.siglas == "E3" && E3Lead.valor_lead) ||
          (rowData.siglas == "E5" && E5Lead.valor_lead) ||
          (rowData.siglas == "S1" && S1Lead.valor_lead) ||
          (rowData.siglas == "S2" && S2Lead.valor_lead) ||
          (rowData.siglas == "S3" && S3Lead.valor_lead) ||
          (rowData.siglas == "S4" && S4Lead.valor_lead) ||
          (rowData.siglas == "S5" && S5Lead.valor_lead) ||
          (rowData.siglas == "S6" && S6Lead.valor_lead)
        }
      />
    );
  };

  const headerMatriculados = () => {
    return (
      <h2 className="text-lg font-semibold text-white bg-rose-700 w-full h-full">
        Matriculados
      </h2>
    );
  };

  const headerInscritos = () => {
    return <h2 className="text-lg font-semibold text-white">Inscritos</h2>;
  };

  const templatePercent = (rowData) => {
    return (
      <p>
        {!isFinite(rowData.rtotalcamp / rowData.valor_lead) ||
        isNaN(rowData.rtotalcamp / rowData.valor_lead)
          ? 0
          : Number.isInteger(rowData.rtotalcamp / rowData.valor_lead)
          ? (rowData.rtotalcamp / rowData.valor_lead).toFixed(0)
          : (rowData.rtotalcamp / rowData.valor_lead).toFixed(1)}
        %
      </p>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Reporte Admisión</h2>
      <div className="flex items-end justify-end gap-x-4 flex-wrap gap-y-4">
        <div className="flex justify-between items-end gap-x-6 bg-white shadow py-2 px-4 border-sm flex-1">
          <div className="flex flex-wrap  gap-3">
            <div className="flex">
              <RadioButton
                inputId="ingredient1"
                name="opcion"
                value="M"
                onChange={(e) => setRadioButton(e.value)}
                checked={radioButton === "M"}
              />
              <label htmlFor="ingredient1" className="ml-2 font-semibold">
                Matriculados
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="ingredient2"
                name="opcion"
                value={"I"}
                onChange={(e) => setRadioButton(e.value)}
                checked={radioButton === "I"}
              />
              <label htmlFor="ingredient2" className="ml-2 font-semibold">
                Inscritos
              </label>
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="periodo" className="block font-semibold">
              Periodo
            </label>
            <Dropdown
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.value)}
              options={periodos}
              optionLabel="periodo"
              placeholder="Selecciona un periodo"
              className="w-full"
              pt={{ root: { className: "font-semibold" } }}
            />
          </div>
        </div>

        {/* <div className="flex gap-x-6 flex-1 bg-white"> */}
        <div className="flex gap-x-6 bg-white shadow py-2 px-4 border-sm flex-1 rounded-sm justify-between">
          <div className="flex-1">
            <label htmlFor="periodo" className="block font-semibold">
              Mes
            </label>
            <Dropdown
              value={selectedMes}
              onChange={(e) => setSelectedMes(e.value)}
              options={meses}
              optionLabel="mes"
              placeholder="Selecciona un mes"
              emptyFilterMessage="No hay resultados"
              className="w-full"
              pt={{ root: { className: "font-semibold" } }}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="periodo" className="block font-semibold">
              Año
            </label>
            <Dropdown
              value={selectedAnio}
              onChange={(e) => setSelectedAnio(e.value)}
              options={anios}
              optionLabel="anio"
              placeholder="Selecciona un año"
              emptyFilterMessage="No hay resultados"
              className="w-full"
              pt={{ root: { className: "font-semibold" } }}
            />
          </div>
          <button
            onClick={buscar_reporte_admision}
            className="bg-rose-700 text-white self-end h-11 rounded-sm px-5 flex items-center gap-x-2"
          >
            <FaSearch />
            Filtrar
          </button>
        </div>
      </div>

      <div className="card mt-4 shadow relative">
        <DataTable
          id="table_admision"
          value={reporteAdmision}
          showGridlines
          className="font-light text-xs"
          emptyMessage="No hay resultados encontrados"
          // scrollHeight="400px"
          header={header}
        >
          {visibleColumns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
        </DataTable>

        <button
          onClick={scroll}
          className="bg-green-600 text-white absolute right-0 -mr-2 py-2 px-4 rounded-sm top-1/2"
        >
          {direccion ? <FaAnglesLeft /> : <FaAnglesRight />}
        </button>
      </div>

      <div className="mt-6 flex gap-x-4 pb-4">
        <DataTable
          value={leadMatriculados}
          emptyMessage="No hay resultados encontrados"
          editMode="cell"
          showGridlines
          className="shadow table_matriculados flex-1 text-xs"
          header={headerMatriculados}
        >
          <Column field="carrera" header="Carrera" />
          <Column field="valor_lead" header="Lead" body={templateLead} />
          <Column field="rtotalcamp" header="Real Total Camp." />
          <Column
            field="rtotalcamp"
            header="%"
            body={templatePercent}
          />
        </DataTable>

        <DataTable
          value={leadInscritos}
          showGridlines
          emptyMessage="No hay resultados encontrados"
          editMode="cell"
          header={headerInscritos}
          className="shadow table_matriculados flex-1 text-xs"
        >
          <Column field="carrera" header="Carrera" />
          <Column field="valor_lead" header="Lead" body={templateLead} />
          <Column field="rtotalcamp" header="Real Total Camp." />
          <Column
            field="rtotalcamp"
            header="%"
            body={templatePercent}
          />
        </DataTable>
      </div>
    </div>
  );
};
