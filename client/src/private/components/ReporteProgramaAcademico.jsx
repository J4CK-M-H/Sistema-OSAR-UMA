import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { FaSearch } from "react-icons/fa";

export const ReporteProgramaAcademico = ({ reporteAcademico, data_reporte_academico }) => {

  const [loadingPeriodos, setLoadingPeriodos] = useState(true);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [periodos, setPeriodos] = useState(null);

  useEffect(() => {
    obtener_periodos()
  }, [])
  
  const obtener_periodos = async () => {
    let parametros = JSON.parse(localStorage.getItem("parametros"));
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

  const buscarPeriodo = async () => {

    if (selectedPeriodo == null) {
      alert("SELECCIONE UN PERIODO");
      return;
    }

    let periodo = selectedPeriodo.periodo;

    data_reporte_academico(periodo)
    // localStorage.setItem(
    //   "parametros",
    //   JSON.stringify({
    //     periodo,
    //     radioOption,
    //   })
    // );
  };

  return (
    <Card>
      <h2 className="text-2xl my-2 py-4 rounded-sm font-semibold text-center bg-rose-700 text-white">
        Reporte por Programa Academico de Periodo Actual
      </h2>
      <div className="flex items-end justify-end gap-x-4 my-2 ">
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
      <DataTable
        value={reporteAcademico}
        showGridlines
        cellClassName={"border-slate-300"}
      >
        <Column
          className="bg-rose-700 text-white text-xs font-bold"
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="carrera"
          header="Programa Academico"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="m_actual"
          header="Total Estud."
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="m_ambos"
          header="No Desertores"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="est_ma"
          header="%"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="nuevos_total"
          header="Total Nuevos"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          className="bg-[#C1F2B0] font-semibold"
          field="cachimbos"
          header="N. 1 ciclo"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="est_c"
          header="%"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          className="bg-[#C1F2B0] font-semibold"
          field="traslados"
          header="Traslados"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="est_t"
          header="Egresados"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="est_e"
          header="%"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="recuperos"
          header="Reincoporaciones"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="est_r"
          header="%"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          className="bg-red-200 font-semibold"
          field="desertores"
          header="Desercion"
        />
        <Column
          headerClassName="bg-rose-700 text-white border border-slate-300"
          field="est_d"
          header="%"
        />
      </DataTable>
    </Card>
  );
};
