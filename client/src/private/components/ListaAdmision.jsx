import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { Column } from "jspdf-autotable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { FaFilter, FaPhone } from "react-icons/fa6";
import { Dialog } from "primereact/dialog";
import { RiPassPendingFill } from "react-icons/ri";
import { TbListLetters } from "react-icons/tb";
import { BsArrowsAngleContract, BsGenderFemale } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiListNumbersDuotone } from "react-icons/pi";
import { Dropdown } from "primereact/dropdown";

export const ListaAdmision = () => {
  const [visible, setVisible] = useState(false);

  const [loadListaAdmision, setLoadListaAdmision] = useState(true);
  const [listaAdmision, setListaAdmision] = useState([]);

  // FILTRO
  const [filterListaAdmision, setFiltersListaAdmision] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValueListaAdmision, setGlobalFilterValueListaAdmision] =
    useState([]);

  const onGlobalFilterChangeListaAdmision = (e) => {
    const value = e.target.value;
    let _filters = { ...filterListaAdmision };

    _filters["global"].value = value;

    setFiltersListaAdmision(_filters);
    setGlobalFilterValueListaAdmision(value);
  };

  // STATES MODAL
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [dniModal, setDniModal] = useState("");
  const [nombreModal, setNombreModal] = useState("");
  const [apellidosModal, setApellidoModal] = useState("");
  const [edadModal, SetEdadModal] = useState("");
  const [correoModal, setCorreModal] = useState("");
  const [celularModal, setCelularModal] = useState("");

  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    listaAdmisionData();
  }, []);
  const listaAdmisionData = async () => {
    setLoadListaAdmision(true);

    const token = JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      let { data } = await useApi("/admision/lista_admision", config);
      setListaAdmision(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadListaAdmision(false);
    }
  };
  let columns = [
    { header: "id", field: "id" },
    { header: "Nombres", field: "nombres" },
    { header: "Apellidos", field: "apellidos" },
    { header: "Edad", field: "edad" },
    { header: "Carrera", field: "carrera" },
    { header: "Telefono", field: "telefono" },
    { header: "Puntaje", field: "total_preguntas" },
    { header: "Estado", field: "estado_entrevista" },
  ];

  const obtenerCarreras = async () => {
    try {
      let { data } = await useApi("admision/lista_admision/obtener_carreras");
      setCarreras(data);
    } catch (error) {
      console.log(data);
    }
  };

  const templateBody = (rowData) => {
    let cambiarEstado = async () => {
      const token = await JSON.parse(localStorage.getItem("user"));

      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      };

      try {
        await useApi.post(
          `admision/lista_admision/update_estado_entrevista/${rowData.id}`,
          { estado_entrevista: rowData.estado_entrevista == 1 ? 0 : 1 },
          config
        );

        let lista_admision_actualizada = listaAdmision.map((item) =>
          item.id == rowData.id
            ? {
                ...item,
                estado_entrevista: item.estado_entrevista == 0 ? 1 : 0,
              }
            : item
        );
        setListaAdmision(lista_admision_actualizada);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    return (
      <button
        onClick={cambiarEstado}
        className={`${
          rowData.estado_entrevista ? "bg-green-600" : "bg-red-500"
        } py-2 px-3 text-white rounded-sm mx-auto block`}
      >
        {rowData.estado_entrevista == 1 ? "Programado" : "No programado"}
      </button>
    );
  };

  const templateHeader = (globalFilter, globalFilterAction) => (
    <div className="flex justify-between">
      <button
        className="bg-green-600 text-white px-2 rounded-sm text-sm"
        onClick={() => {
          setVisible(true);
          obtenerCarreras();
          disableScrolling();
        }}
      >
        Agregar Estudiante
      </button>

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

  const templateId = (rowData) => {
    return <button>{rowData.id}</button>;
  };

  function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  function enableScrolling() {
    window.onscroll = function () {};
  }

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2 ">
      <span className="font-bold white-space-nowrap text-white">
        Agregar Estudiante
      </span>
    </div>
  );

  const bodyPuntaje = (rowData) => {
    return (
      <div className={`${rowData.total_preguntas >= 12 ? 'text-green-600' : 'text-red-600' } font-semibold`}>
        <p>{rowData.total_preguntas}</p>
      </div>
    );
  };

  const agregar_estudiante = async () => {
    try {
      await useApi.post("admision/lista_admision/agregar_estudiante", {
        dni: dniModal,
        nombres: nombreModal,
        apellidos: apellidosModal,
        edad: edadModal,
        correo: correoModal,
        telefono: celularModal,
        carrera: selectedCarrera.nomesp,
      });
    } catch (error) {
      console.log(error);
    } finally {
      listaAdmision.push({
        id: listaAdmision.length,
        dni: dniModal,
        nombres: nombreModal,
        apellidos: apellidosModal,
        edad: edadModal,
        correo: correoModal,
        telefono: celularModal,
        carrera: selectedCarrera.nomesp,
        total_preguntas: 0,
        estado_entrevista: 0,
      });

      setDniModal("");
      setNombreModal("");
      setApellidoModal("");
      setCelularModal("");
      setSelectedCarrera(null);
      setCorreModal("");
      SetEdadModal("");
    }
  };

  return (
    <div className="block pb-4">
      <h2 className="text-3xl font-bold">Lista de Admisión</h2>

      <div className="card card_admision">
        <Accordion multiple activeIndex={[0]} className="space-y-8">
          <AccordionTab header="LISTA ADMISION">
            <div className="card">
              <DataTable
                // loading={loadListaAdmision}
                header={() =>
                  templateHeader(
                    globalFilterValueListaAdmision,
                    onGlobalFilterChangeListaAdmision
                  )
                }
                filters={filterListaAdmision}
                value={listaAdmision}
                showGridlines
                paginatorClassName="text-red-800"
                rows={5}
                paginator
                rowsPerPageOptions={[5, 10]}
                globalFilterFields={[
                  "nombres",
                  "apellidos",
                  "carrera",
                  "telefono",
                  "total_preguntas",
                ]}
                id="my-table"
              >
                <Column
                  field="id"
                  header="#"
                  body={templateId}
                  headerClassName="bg-rose-700 text-white"
                />
                <Column
                  field="nombres"
                  header="Nombres"
                  headerClassName="bg-rose-700 text-white"
                />
                <Column
                  field="apellidos"
                  header="Apellidos"
                  headerClassName="bg-rose-700 text-white"
                />
                <Column
                  field="edad"
                  header="Edad"
                  headerClassName="bg-rose-700 text-white"
                />
                <Column
                  field="carrera"
                  header="Carrera"
                  headerClassName="bg-rose-700 text-white"
                />
                <Column
                  field="telefono"
                  header="Telefono"
                  headerClassName="bg-rose-700 text-white"
                />
                <Column
                  field="total_preguntas"
                  header="Puntaje"
                  headerClassName="bg-rose-700 text-white"
                  body={bodyPuntaje}
                />
                <Column
                  field="estado"
                  header="Estado"
                  body={templateBody}
                  headerClassName="bg-rose-700 text-white"
                />
              </DataTable>
            </div>
          </AccordionTab>
        </Accordion>

        <Dialog
          visible={visible}
          modal
          header={headerElement}
          className="w-2/3 xl:w-3/6"
          onHide={() => {
            setVisible(false);
            enableScrolling();
          }}
          headerClassName="bg-rose-700"
        >
          <div className="space-y-4 pt-4 checking_admision">
            <div className="p-inputgroup flex flex-col w-full">
              <label
                htmlFor="dni"
                className="font-bold"
                style={{ fontSize: ".9rem" }}
              >
                DNI
              </label>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <RiPassPendingFill style={{ scale: "1.8" }} color="white" />
                </span>
                <InputText
                  placeholder="DNI"
                  className="h-11 placeholder:text-sm font-bold text-sm"
                  id="dni"
                  value={dniModal}
                  onChange={(event) => setDniModal(event.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-x-4">
              <div className="p-inputgroup flex flex-col flex-1">
                <label
                  htmlFor="nombres"
                  className="font-bold"
                  style={{ fontSize: ".9rem" }}
                >
                  Nombres
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon bg-rose-700">
                    <TbListLetters style={{ scale: "1.8" }} color="white" />
                  </span>
                  <InputText
                    placeholder="Nombres"
                    className="h-11 placeholder:text-sm font-bold text-sm"
                    id="nombres"
                    value={nombreModal}
                    onChange={(event) => setNombreModal(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="apellidos"
                  className="font-bold"
                  style={{ fontSize: ".9rem" }}
                >
                  Apellidos
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon bg-rose-700">
                    <BsGenderFemale style={{ scale: "1.6" }} color="white" />
                  </span>
                  <InputText
                    placeholder="Apellidos"
                    className="h-11 placeholder:text-sm font-bold text-sm"
                    id="apellidos"
                    value={apellidosModal}
                    onChange={(event) => setApellidoModal(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label
                  htmlFor="celular"
                  className="font-bold"
                  style={{ fontSize: ".9rem" }}
                >
                  Celular
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon bg-rose-700">
                    <FaPhone style={{ scale: "1.4" }} color="white" />
                  </span>
                  <InputText
                    placeholder="Celular"
                    id="celular"
                    className="h-11 placeholder:text-sm font-bold text-sm"
                    value={celularModal}
                    onChange={(event) => setCelularModal(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="edad"
                  className="font-bold"
                  style={{ fontSize: ".9rem" }}
                >
                  Edad
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon bg-rose-700">
                    <PiListNumbersDuotone
                      style={{ scale: "1.4" }}
                      color="white"
                    />
                  </span>
                  <InputText
                    placeholder="Edad"
                    id="edad"
                    className="h-11 placeholder:text-sm md:w-1/2 font-bold text-sm"
                    value={edadModal}
                    onChange={(event) => SetEdadModal(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-3">
              <div className="flex-1">
                <label
                  htmlFor="correo"
                  className="font-bold"
                  style={{ fontSize: ".9rem" }}
                >
                  Correo
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon bg-rose-700">
                    <MdOutlineAlternateEmail
                      style={{ scale: "1.4" }}
                      color="white"
                    />
                  </span>
                  <InputText
                    placeholder="correo"
                    id="correo"
                    className="h-11 placeholder:text-sm md:w-1/2 font-bold text-sm"
                    value={correoModal}
                    onChange={(event) => setCorreModal(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <BsArrowsAngleContract
                    style={{ scale: "1.5" }}
                    color="white"
                  />
                </span>
                <Dropdown
                  value={selectedCarrera}
                  onChange={(e) => setSelectedCarrera(e.value)}
                  options={carreras}
                  optionLabel="nomesp"
                  placeholder="Selecciona una carrera"
                  emptyFilterMessage="No hay resultados"
                  className="overflow-auto w-full"
                  pt={{ root: { className: "font-bold" } }}
                  filter
                  width={100}
                />
              </div>
            </div>

            <div className="flex gap-x-4 justify-end">
              <button
                onClick={() => {
                  setVisible(false);
                  agregar_estudiante();
                  enableScrolling();
                }}
                className="bg-[#388E3C] text-white py-2 block mt-4 px-2 rounded-sm font-semibold text-sm"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setVisible(false);
                  enableScrolling();
                }}
                className="bg-gray-500 text-white py-2 block mt-4 px-2 rounded-sm text-sm font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
