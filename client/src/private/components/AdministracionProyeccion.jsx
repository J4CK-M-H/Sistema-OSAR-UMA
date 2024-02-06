import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { BsCalendar2DateFill } from "react-icons/bs";
import { InputText } from "primereact/inputtext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const turno = [
  { name: "matriculado", code: "matriculado" },
  { name: "inscrito", code: "inscrito" },
];

export const AdministracionProyeccion = () => {
  const toastDel = useRef(null);
  const toastConfirm = useRef(null);

  const [listaProyeccion, setListaProyeccion] = useState([]);
  const [visible, setVisible] = useState(false);

  const [enableEdit, setEnableEdit] = useState(false);

  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);

  const [periodo, setPeriodo] = useState(null);

  const [id, setId] = useState(null);
  const [enero, setEnero] = useState(0);
  const [febrero, setFebrero] = useState(0);
  const [marzo, setMarzo] = useState(0);
  const [abril, setAbril] = useState(0);
  const [mayo, setMayo] = useState(0);
  const [junio, setJunio] = useState(0);
  const [julio, setJulio] = useState(0);
  const [agosto, setAgosto] = useState(0);
  const [septiembre, setSeptiembre] = useState(0);
  const [octubre, setOctubre] = useState(0);
  const [noviembre, setNoviembre] = useState(0);
  const [diciembre, setDiciembre] = useState(0);

  let get_lista_proyeccion = async () => {
    const token = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      let { data } = await useApi(
        "admision/administracion_proyeccion/lista_proyeccion",
        config
      );
      setListaProyeccion(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_lista_proyeccion();
  }, []);

  const buscarProyeccion = async (id) => {
    cargar_carreras();

    const token = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    try {
      let { data } = await useApi.post(
        `admision/administracion_proyeccion/buscar_proyeccion/${id}`, config
      );

      setId(data.idproy);
      setEnero(data.enero);
      setFebrero(data.febrero);
      setMarzo(data.marzo);
      setAbril(data.abril);
      setMayo(data.mayo);
      setJunio(data.junio);
      setJulio(data.julio);
      setAgosto(data.agosto);
      setSeptiembre(data.septiembre);
      setOctubre(data.octubre);
      setNoviembre(data.noviembre);
      setDiciembre(data.diciembre);
      setPeriodo(data.periodo);
      setSelectedTurno({ name: data.tipo, code: data.tipo });
      setSelectedCarrera({ codesp: data.carrera, nomesp: data.nomesp });
    } catch (error) {
      console.log(error);
    }
  };

  const borrar_proyeccion = async (id) => {
    clear();
    try {
      await useApi.delete(
        `admision/administracion_proyeccion/borrar_proyeccion/${id}`
      );
      setVisibleConfirm(false);
      let listaProyeccionActualizada = listaProyeccion.filter(
        (admision) => admision.idproy !== id
      );
      setListaProyeccion(listaProyeccionActualizada);
    } catch (error) {
      console.log(error);
    } finally {
      toastProyeccionEliminada();
    }
  };

  const clear = async () => {
    toastConfirm.current.clear();
    setVisibleConfirm(false);
  };

  const confirm = (idproyeccion) => {
    if (!visibleConfirm) {
      setVisibleConfirm(true);
      toastConfirm.current.clear();
      toastConfirm.current.show({
        severity: "error",
        summary: "Can you send me the report?",
        sticky: true,
        content: (props) => (
          <div
            className="space-y-2 flex flex-col items-center"
            style={{ flex: "1" }}
          >
            <div className="flex align-items-center gap-2">
              <span className="font-bold text-900">
                ¿Estas seguro de realizar la acción?
              </span>
            </div>

            <button
              onClick={() => borrar_proyeccion(idproyeccion)}
              className="px-4 py-2 text-white rounded-sm text-md font-semibold bg-[#FE0000]"
            >
              Confirmar
            </button>
          </div>
        ),
      });
    }
  };

  const ActionsTemplate = (rowData) => {
    return (
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            setEnableEdit(true);
            // metodo para editar
            buscarProyeccion(rowData.idproy);
            setVisibleModal(true);
          }}
        >
          <MdEdit size={25} className="text-blue-700" />
        </button>
        <button onClick={() => confirm(rowData.idproy)} label="Confirm">
          <MdDelete size={25} className="text-red-500" label="Delete" />
        </button>
      </div>
    );
  };

  const limpiar_estados = () => {
    setId(null);
    setEnero(0);
    setFebrero(0);
    setMarzo(0);
    setAbril(0);
    setMayo(0);
    setJunio(0);
    setJulio(0);
    setAgosto(0);
    setSeptiembre(0);
    setOctubre(0);
    setNoviembre(0);
    setDiciembre(0);
    setPeriodo(null);
    setSelectedTurno(null);
    setSelectedCarrera(null);
  };

  const cargar_carreras = async () => {
    const token = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      let { data } = await useApi(
        "admision/administracion_proyeccion/cargar_carreras",
        config
      );
      setCarreras(data);
    } catch (error) {
      console.log(error);
    }
  };

  const headerTemplate = () => {
    return (
      <button
        className="bg-green-600 text-white py-4 px-3 rounded-sm hover:bg-green-500"
        onClick={() => {
          cargar_carreras();
          setVisibleModal(true);
        }}
      >
        Agregar Proyección
      </button>
    );
  };

  const toastProyecionAgregada = () => toast.success("Proyección agregada");
  const toastProyecionEditada = () => toast.success("Proyección editada");
  const toastProyeccionEliminada = () => toast.error("Proyección eliminada");

  const headerModalTemplate = () => {
    return <h2 className="bg-rose-700 text-white">Modal de proyección</h2>;
  };
  const edit_agregar_proyeccion = async (event) => {
    event.preventDefault();

    switch (enableEdit) {
      case true:
        if (
          selectedCarrera == null ||
          selectedTurno == null ||
          periodo == null
        ) {
          alert("selecciona los campos");
          return;
        }

        try {
          await useApi.put(
            `admision/administracion_proyeccion/editar_proyeccion/${id}`,
            {
              periodo,
              carrera: selectedCarrera.codesp,
              tipo: selectedTurno.name,
              enero,
              febrero,
              marzo,
              abril,
              mayo,
              junio,
              julio,
              agosto,
              septiembre,
              octubre,
              noviembre,
              diciembre,
            }
          );

          toastProyecionEditada();
        } catch (error) {
          console.log(error);
        } finally {
          get_lista_proyeccion();
          setVisibleModal(false);
          setEnableEdit(false);
          limpiar_estados();
        }
        break;
      default:
        if (
          selectedCarrera == null ||
          selectedTurno == null ||
          periodo == null
        ) {
          alert("selecciona los campos");
          return;
        }

        try {
          await useApi.post(
            "admision/administracion_proyeccion/agregar_proyeccion",
            {
              periodo,
              carrera: selectedCarrera.codesp,
              tipo: selectedTurno.name,
              enero,
              febrero,
              marzo,
              abril,
              mayo,
              junio,
              julio,
              agosto,
              septiembre,
              octubre,
              noviembre,
              diciembre,
            }
          );
          toastProyecionAgregada();
        } catch (error) {
          console.log(error);
        } finally {
          get_lista_proyeccion();
          setVisibleModal(false);
          setEnableEdit(false);
          limpiar_estados();
        }
        break;
    }
  };

  return (
    <div className="pb-8">
      <h2 className="text-3xl font-semibold mb-4">Administración Proyección</h2>
      <Toast ref={toastDel} />
      <ConfirmPopup />
      <Card>
        <DataTable
          value={listaProyeccion}
          showGridlines
          className="text-xs"
          header={headerTemplate}
        >
          <Column
            field="null"
            header=""
            body={ActionsTemplate}
            headerClassName="bg-rose-700"
          />
          <Column
            field="periodo"
            header="Periodo"
            align={"center"}
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="nomesp"
            header="Carrera"
            style={{ fontSize: ".1rem !important" }}
            headerClassName="text-center bg-rose-700 text-white"
          />
          <Column
            field="tipo"
            header="Tipo"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="enero"
            header="Ene"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="febrero"
            header="Feb"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="marzo"
            header="Marz"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="abril"
            header="Abr"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="mayo"
            header="May"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="junio"
            header="Jun"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="julio"
            header="Jul"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="agosto"
            header="Ago"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="septiembre"
            header="Sep"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="octubre"
            header="Oct"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="noviembre"
            header="Nov"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="diciembre"
            header="Dic"
            headerClassName="bg-rose-700 text-white"
          />
        </DataTable>
      </Card>

      <Dialog
        header={headerModalTemplate}
        visible={visibleModal}
        onHide={() => {
          setVisibleModal(false);
          setEnableEdit(false);
          limpiar_estados();
        }}
        className="w-4/5 md:w-2/3"
      >
        <form className="pt-6 space-y-4">
          <div className="flex-1">
            <label htmlFor="carrera" className="font-semibold">
              Carrera
            </label>
            <Dropdown
              value={selectedCarrera}
              onChange={(e) => setSelectedCarrera(e.value)}
              options={carreras}
              optionLabel="nomesp"
              placeholder="Escoge una carrera"
              className="w-full flex-1"
              inputId="carrera"
            />
          </div>
          <div className="flex gap-x-6">
            <div className="p-inputgroup flex-1 flex-col">
              <label htmlFor="periodo" className="font-semibold">
                Periodo
              </label>
              <div className="flex">
                <span className="p-inputgroup-addon">
                  <BsCalendar2DateFill className="scale-150" />
                </span>
                <InputMask
                  id="periodo"
                  mask="9999-9"
                  placeholder="0000-0"
                  className="rounded-l-none"
                  value={periodo}
                  onChange={(event) => setPeriodo(event.target.value)}
                ></InputMask>
              </div>
            </div>

            <div className="p-inputgroup flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Tipo
              </label>
              <Dropdown
                value={selectedTurno}
                onChange={(e) => setSelectedTurno(e.value)}
                options={turno}
                optionLabel="name"
                placeholder="Selecciona un turno"
                className="w-full flex-1 rounded-md"
                inputId="turno"
              />
            </div>
          </div>

          <div className="flex gap-x-6">
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Enero
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={enero}
                onChange={(event) => setEnero(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Febrero
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={febrero}
                onChange={(event) => setFebrero(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Marzo
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={marzo}
                onChange={(event) => setMarzo(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Abril
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={abril}
                onChange={(event) => setAbril(event.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-x-6">
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Mayo
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={mayo}
                onChange={(event) => setMayo(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Junio
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={junio}
                onChange={(event) => setJunio(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Julio
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={julio}
                onChange={(event) => setJulio(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Agosto
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={agosto}
                onChange={(event) => setAgosto(event.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-x-6">
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Septiembre
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={septiembre}
                onChange={(event) => setSeptiembre(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Octubre
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={octubre}
                onChange={(event) => setOctubre(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Noviembre
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={noviembre}
                onChange={(event) => setNoviembre(event.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold">
                Diciembre
              </label>
              <InputText
                keyfilter="int"
                className="flex-1 w-full"
                value={diciembre}
                onChange={(event) => setDiciembre(event.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-8">
            <button
              className="py-2 px-4 text-white rounded-sm bg-green-700"
              autoFocus
              type="submit"
              onClick={(event) => edit_agregar_proyeccion(event, enableEdit)}
            >
              {enableEdit ? "Editar" : "Agregar"}
            </button>
            <button
              className="py-2 px-4 text-white rounded-sm bg-yellow-600"
              type="button"
              onClick={() => {
                setVisibleModal(false);
                setEnableEdit(false);
                limpiar_estados();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Dialog>
      <ToastContainer autoClose={1000} position="top-right" />
      <Toast ref={toastConfirm} position="bottom-center" onRemove={clear} />
    </div>
  );
};
