import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { Column } from "jspdf-autotable";
import { MdModeEdit, MdOutlineNumbers } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import toast, { Toaster } from "react-hot-toast";

const OPCIONES_TIPO = [
  { name: "PREGRADO", code: "PRE" },
  { name: "SEGUNDA ESPECIALIDAD", code: "SEG" },
  { name: "MAESTRIA PUBLICA", code: "MAES" },
];

export const FechasIngresoEgreso = () => {
  const [fechasIngresoEgreso, setFechasIngresoEgreso] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaEgreso, setFechaEgreso] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [selectedTipo, setSelectedTipo] = useState({
    name: "PREGRADO",
    code: "PRE",
  });

  const [idUpdate, setIdUpdate] = useState("");
  const [fechaIngresoEditar, setFechaIngresoEditar] = useState("");
  const [fechaEgresoEditar, setFechaEgresoEditar] = useState("");
  const [periodoEditar, setPeriodoEditar] = useState("");
  const [selectedTipoEditar, setSelectedTipoEditar] = useState({
    name: "PREGRADO",
    code: "PRE",
  });
  const [visibleEdit, setVisibleEdit] = useState(false);

  useEffect(() => {
    obtener_fechas_ingresos_egresos();
  }, []);

  const obtener_fechas_ingresos_egresos = async () => {
    try {
      let { data } = await useApi("/fechas/fechas_ingreso_egreso");
      setFechasIngresoEgreso(data);
    } catch (error) {
      console.log(error);
    }
  };

  const notify = (message,value = 1) => {
    if(value == 1) {
      toast.success(message);
    }else{
      toast.error(message);
    }
  };

  const registrar_fecha_ingreso_egreso = async () => {
    if ([fechaIngreso.trim(), periodo.trim()].some((field) => field == "")) {
      notify("Complete todo los campos", 0);
      return;
    }

    try {
      let { data } = await useApi.post("/fechas/agregar_registro", {
        tipo: selectedTipo.code,
        periodo,
        fechaEgreso,
        fechaIngreso,
      });
    } catch (error) {
      console.log(error);
    } finally {
      obtener_fechas_ingresos_egresos();
      setVisible(false);
      setPeriodo("");
      setFechaEgreso("");
      setFechaIngreso("");
      notify("Nuevo registro agregado",1);
    }
  };

  const templateActions = (data) => {
    const editRow = async () => {
      setVisibleEdit(true);
      if (data.tipo == "PRE") {
        setSelectedTipoEditar({ name: "PREGRADO", code: "PRE" });
      } else if (data.tipo == "SEG") {
        setSelectedTipoEditar({ name: "SEGUNDA ESPECIALIDAD", code: "SEG" });
      } else {
        setSelectedTipoEditar({ name: "MAESTRIA PUBLICA", code: "MAES" });
      }
      setIdUpdate(data.id);
      setPeriodoEditar(data.periodo);
      setFechaIngresoEditar(data.fecha_ingreso);
      setFechaEgresoEditar(data.fecha_egreso);
    };

    return (
      <div>
        <button className="bg-blue-600 py-2 px-4 rounded-sm" onClick={editRow}>
          <MdModeEdit color="white" />
        </button>
      </div>
    );
  };

  const actualizar_fecha_ingreso_egreso = async () => {
    try {
      await useApi.put(`/fechas/actualizar_fecha_ingreso_egreso/${idUpdate}`, {
        tipo: selectedTipoEditar.code,
        periodo: periodoEditar,
        fecha_ingreso: fechaIngresoEditar,
        fecha_egreso: fechaEgresoEditar,
      });
    } catch (error) {
      console.log(error);
    } finally {
      obtener_fechas_ingresos_egresos();
      setVisibleEdit(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">Fechas de ingreso y egreso</h2>

      <button
        className="bg-green-600 text-white  py-2 px-4 rounded-sm"
        onClick={() => setVisible(true)}
      >
        Agregar
      </button>

      <Card>
        <DataTable
          value={fechasIngresoEgreso}
          rows={4}
          paginator
          showGridlines
          // rowClassName={5}
          // rowsPerPageOptions={4}
        >
          <Column field="tipo" header="Tipo" />
          <Column field="fecha_ingreso" header="Fecha Ingreso" />
          <Column field="fecha_egreso" header="Fecha Egreso" />
          <Column field="periodo" header="Periodo" />
          <Column body={templateActions} />
        </DataTable>
      </Card>

      <Dialog
        header={"Agrega un nuevo registro"}
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[600px]"
      >
        <div className="space-y-4 mt-4">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <Dropdown
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.value)}
              options={OPCIONES_TIPO}
              optionLabel="name"
              placeholder="Seleccione la participacion"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <InputMask
              value={periodo}
              onChange={(event) => setPeriodo(event.target.value)}
              mask="9999-9"
              placeholder="0000-0"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <InputMask
              value={fechaIngreso}
              onChange={(event) => setFechaIngreso(event.target.value)}
              mask="99/99/9999"
              placeholder="dd/mm/yy"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <InputMask
              value={fechaEgreso}
              onChange={(event) => setFechaEgreso(event.target.value)}
              mask="99/99/9999"
              placeholder="dd/mm/yy"
            />
          </div>
          <button
            className="bg-green-600 text-white py-2 rounded-sm w-full"
            onClick={registrar_fecha_ingreso_egreso}
          >
            Registrar
          </button>
        </div>
      </Dialog>

      <Dialog
        header={"Actualiza el registro"}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
        className="w-[600px]"
      >
        <div className="space-y-4 mt-4">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <Dropdown
              value={selectedTipoEditar}
              onChange={(e) => setSelectedTipoEditar(e.value)}
              options={OPCIONES_TIPO}
              optionLabel="name"
              placeholder="Seleccione la participacion"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <InputText
              value={periodoEditar}
              onChange={(event) => setPeriodoEditar(event.target.value)}
              placeholder="Periodo"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <InputText
              value={fechaIngresoEditar}
              onChange={(event) => setFechaIngresoEditar(event.target.value)}
              placeholder="Fecha Ingreso"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <MdOutlineNumbers className="text-white" />
            </span>
            <InputText
              value={fechaEgresoEditar}
              onChange={(event) => setFechaEgresoEditar(event.target.value)}
              placeholder="Fecha Egreso"
            />
          </div>
          <button
            className="bg-yellow-600 text-white py-2 rounded-sm w-full"
            onClick={actualizar_fecha_ingreso_egreso}
          >
            Actualizar
          </button>
        </div>
      </Dialog>

      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};
