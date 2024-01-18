import { Accordion, AccordionTab } from "primereact/accordion";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useApi } from "../../hooks/useAxios";
import { useState } from "react";
import { Column } from "jspdf-autotable";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RiPassPendingFill } from "react-icons/ri";
import { TbListLetters } from "react-icons/tb";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { FaFilter, FaPhone } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BsArrowsAngleContract } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaCloudMoon } from "react-icons/fa";
import { Calendar } from "primereact/calendar";
import { FaSackDollar } from "react-icons/fa6";
import { InputNumber } from "primereact/inputnumber";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FilterMatchMode, addLocale } from "primereact/api";

const turno = [
  { name: "Mañana", code: "M" },
  { name: "Noche", code: "N" },
];

export const ChekingAdmision = () => {
  const [loading, setLoading] = useState(true);

  //NO VALIDADOS
  const [chDniNoValidados, setChDniNoValidados] = useState([]);
  const [chSecNoValidados, setChSecNoValidados] = useState([]);
  const [chDj1NoValidados, setChDj1NoValidados] = useState([]);
  const [chDjSecuNoValidados, setDjSecuNoValidados] = useState([]);
  const [chMatriculaNoValidados, setChMatriculaNoValidados] = useState([]);
  const [chCuotaNoValidados, setChCuotaNoValidados] = useState([]);
  const [estadoAlumnos, setEstadoAlumnos] = useState([]);

  // VISIBLE MODAL
  const [visible, setVisible] = useState(false);

  // STATES DEL MODAL DE VALIDACIÓN
  const [selectedModalidadMatricula, setSelectedModalidadMatricula] =
    useState();
  const [selectedMotivoDescuento, setSelectedMotivoDescuento] = useState({
    Nombre: "",
    codigo: "",
  });
  const [selectedTurnoMatricula, setSelectedTurnoMatricula] = useState(null);
  const [selectedNacimientoMatricula, SelectedNacimientoMatricula] =
    useState(null);

  const [idEstudiante, setIdEstudiante] = useState(null);
  const [dniModal, setDniModal] = useState("");
  const [nombreModal, setNombreModal] = useState("");
  const [apellidoMaternoModal, SetApellidoMaternoModal] = useState("");
  const [apellidoPaternoModal, SetApellidoPaternoModal] = useState("");
  const [correoModal, setCorreModal] = useState("");
  const [celularModal, setCelularModal] = useState("");
  const [ejecutivaModal, setEjecutivaModal] = useState(null);
  const [fechaNacimientoModal, setFechaNacimientoModal] = useState(null);
  const [turnoModal, setTurnoModal] = useState("");

  //* LENGUAJE PARA CAMBIAR DE INGLES A SPANISH LAS FECHAS JIJIJI
  addLocale("es", {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  const [descuentosModal, setDescuentosModal] = useState([]);
  const [modalidadIngresosModal, setModalidadIngresosModal] = useState([]);

  const [validados, setValidados] = useState([]);
  const [noValidados, setNoValidados] = useState([]);

  // FILTROS
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [filtersNoValidados, setFiltersNoValidados] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState([]);
  const [globalFilterValueNoValidado, setGlobalFilterValueNoValidado] = useState([]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onGlobalFilterChangeNoValidado = (e) => {
    const value = e.target.value;
    let _filters = { ...filtersNoValidados };

    _filters["global"].value = value;

    setFiltersNoValidados(_filters);
    setGlobalFilterValueNoValidado(value);
  };

  useEffect(() => {
    checking_admision_data();

    return () => {
      console.log("Componente Desmontado");
    };
  }, []);

  const checking_admision_data = async () => {
    setLoading(true);
    try {
      let { data } = await useApi(`admision/checking_admision`);
      setValidados(data.validados);
      setNoValidados(data.no_validados);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "", header: "#" },
    { field: "ch_dni", header: "DNI" },
    { field: "ch_nombres", header: "Nombres" },
    { field: "abrev", header: "Carrera" },
    { field: "ch_validacion", header: "Validacion" },
    { field: "ch_edni", header: "DNI" },
    { field: "ch_dj", header: "DJ 1" },
    { field: "ch_secu", header: "SEC" },
    { field: "ch_djsecu", header: "DJ 2" },
    { field: "ch_p_matricula", header: "MAT" },
    { field: "ch_p_cuota", header: "PC" },
    { field: "ch_estado_alu", header: "estado alumno" },
  ];

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

  const loadDataEstudiante = async (id) => {
    try {
      let { data } = await useApi.post(
        `admision/checking_admision/get_user_by_id/${id}`
      );

      setIdEstudiante(data.id);
      setDniModal(data.ch_dni);
      setNombreModal(data.ch_nombres);
      SetApellidoPaternoModal(data.ch_apepat);
      SetApellidoMaternoModal(data.ch_apemat);
      setCorreModal(data.ch_correo);
      setCelularModal(data.ch_celular);
      setEjecutivaModal(data.ch_ejecutiva);
      if (data.ch_turno == "M") {
        setTurnoModal({ name: "Mañana", code: "M" });
      } else {
        setTurnoModal({ name: "Noche", code: "N" });
      }
      setFechaNacimientoModal(new Date(data.ch_fecnac));
      setSelectedModalidadMatricula(data.objeto_modalidad);
      setSelectedMotivoDescuento(data.objeto_descuento);

      let { data: descuentos_x_modalidades } = await useApi(
        "admision/checking_admision/get_descuentos_modalidades"
      );
      setDescuentosModal(descuentos_x_modalidades.descuentos);
      setModalidadIngresosModal(descuentos_x_modalidades.modalidades_ingreso);
    } catch (error) {
      console.log(error);
    }
  };

  const validacionBody = (rowData) => {
    return (
      <button
        className={`${
          rowData.ch_validacion == 0 ? "bg-red-600" : "bg-green-700"
        }  text-white py-2 px-4 rounded-sm`}
        onClick={() => {
          setVisible(true);
          disableScrolling();
          loadDataEstudiante(rowData.id);
        }}
      >
        {rowData.ch_validacion == 0 ? "No validado" : "Validado"}
      </button>
    );
  };

  const dj1Body = (rowData) => {
    const changeChecked = async (event) => {
      let elemento = event.target;
      let ch_dj1 = event.target.checked ? 1 : 0;
      let id = elemento.getAttribute("id");
      setChDj1NoValidados([...chDj1NoValidados, { id, ch_dj1 }]);

      try {
        let { data } = await useApi.put(
          `admision/checking_admision/update_dj1/${id}`,
          { ch_dj1 }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        checking_admision_data();
      }
    };

    return (
      <div className="card flex justify-content-center">
        <input
          type="checkbox"
          className="block mx-auto w-5 h-5"
          id={`${rowData.id}`}
          onChange={changeChecked}
          checked={rowData.ch_dj}
        />
      </div>
    );
  };

  const templateHeader = (
    globalFilter,
    globalFilterAction
  ) => (
    <div className="flex justify-between items-center">
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

  const templateHeaderNoValidado = (
    globalFilter,
    globalFilterAction
  ) => (
    <div className="flex justify-between items-center">
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

  const dniBody = (rowData) => {
    const changeChecked = async (event) => {
      let elemento = event.target;
      let ch_edni = event.target.checked ? 1 : 0;
      let id = elemento.getAttribute("id");

      setChDniNoValidados([...chDniNoValidados, { id, ch_edni }]);
      try {
        let { data } = await useApi.put(
          `admision/checking_admision/update_ch_edni/${id}`,
          { ch_edni }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        checking_admision_data();
      }
    };

    return (
      <div className="card flex justify-content-center">
        <input
          type="checkbox"
          className="block mx-auto w-5 h-5"
          id={`${rowData.id}`}
          onChange={changeChecked}
          checked={rowData.ch_edni}
        />
      </div>
    );
  };

  const ch_secuBody = (rowData) => {
    const changeChecked = async (event) => {
      let elemento = event.target;
      let ch_secu = event.target.checked ? 1 : 0;
      let id = elemento.getAttribute("id");
      setChSecNoValidados([...chSecNoValidados, { id, ch_secu: ch_secu }]);
      try {
        let { data } = await useApi.put(
          `admision/checking_admision/update_ch_secu/${id}`,
          { ch_secu }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        checking_admision_data();
      }
    };

    return (
      <div className="card flex justify-content-center">
        <input
          type="checkbox"
          className="block mx-auto w-5 h-5"
          id={`${rowData.id}`}
          onChange={changeChecked}
          // onClick={}
          checked={rowData.ch_secu}
        />
      </div>
    );
  };

  const ch_djsecuBody = (rowData) => {
    const changeChecked = async (event) => {
      let elemento = event.target;
      let ch_djsecu = event.target.checked ? 1 : 0;
      let id = elemento.getAttribute("id");
      setDjSecuNoValidados([
        ...chDjSecuNoValidados,
        { id, ch_djsecu: ch_djsecu },
      ]);
      try {
        let { data } = await useApi.put(
          `admision/checking_admision/update_ch_djsecu/${id}`,
          { ch_djsecu }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        checking_admision_data();
      }
    };

    return (
      <div className="card flex justify-content-center">
        <input
          type="checkbox"
          className="block mx-auto w-5 h-5"
          id={`${rowData.id}`}
          onChange={changeChecked}
          checked={rowData.ch_djsecu}
        />
      </div>
    );
  };

  const ch_p_matriculaBody = (rowData) => {
    const changeChecked = async (event) => {
      let elemento = event.target;
      let ch_p_matricula = event.target.checked ? 1 : 0;
      let id = elemento.getAttribute("id");
      setChMatriculaNoValidados([
        ...chMatriculaNoValidados,
        { id, ch_p_matricula },
      ]);
      try {
        let { data } = await useApi.put(
          `admision/checking_admision/update_ch_p_matricula/${id}`,
          { ch_p_matricula }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        checking_admision_data();
      }
    };

    return (
      <div className="card flex justify-content-center">
        <input
          type="checkbox"
          className="block mx-auto w-5 h-5"
          id={`${rowData.id}`}
          onChange={changeChecked}
          // onClick={}
          checked={rowData.ch_p_matricula}
        />
      </div>
    );
  };

  const ch_p_cuotaBody = (rowData) => {
    const changeChecked = async (event) => {
      let elemento = event.target;
      let ch_p_cuota = event.target.checked ? 1 : 0;
      let id = elemento.getAttribute("id");
      setChCuotaNoValidados([...chCuotaNoValidados, { id, ch_p_cuota }]);
      try {
        let { data } = await useApi.put(
          `admision/checking_admision/update_ch_p_cuota/${id}`,
          { ch_p_cuota }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        checking_admision_data();
      }
    };

    return (
      <div className="card flex justify-content-center">
        <input
          type="checkbox"
          className="block mx-auto w-5 h-5"
          id={`${rowData.id}`}
          onChange={changeChecked}
          // onClick={}
          checked={rowData.ch_p_cuota}
        />
      </div>
    );
  };

  const estadoBody = (rowData) => {
    return (
      <div className="card flex justify-content-center">
        <button
          className={`${
            (rowData.ch_edni == 1 &&
              rowData.ch_dj == 1 &&
              rowData.ch_secu == 1 &&
              rowData.ch_p_matricula == 1 &&
              rowData.ch_p_cuota == 1) ||
            (rowData.ch_edni == 1 &&
              rowData.ch_dj == 1 &&
              rowData.ch_djsecu == 1 &&
              rowData.ch_p_matricula == 1 &&
              rowData.ch_p_cuota == 1)
              ? "bg-[#309b22] text-white"
              : "bg-[#F4CE14] "
          } rounded-sm py-2 px-4 block mx-auto`}
        >
          {(rowData.ch_edni == 1 &&
            rowData.ch_dj == 1 &&
            rowData.ch_secu == 1 &&
            rowData.ch_p_matricula == 1 &&
            rowData.ch_p_cuota == 1) ||
          (rowData.ch_edni == 1 &&
            rowData.ch_dj == 1 &&
            rowData.ch_djsecu == 1 &&
            rowData.ch_p_matricula == 1 &&
            rowData.ch_p_cuota == 1)
            ? "Matriculado"
            : "Inscrito"}
        </button>
      </div>
    );
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2 ">
      {/* <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      /> */}
      <span className="font-bold white-space-nowrap text-white">
        Validar Estudiante
      </span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const validarEstudiante = async () => {
    try {
      let corteFecha = new Date(fechaNacimientoModal)
        .toLocaleDateString()
        .split("/");
      let fechaOrdenada = `${corteFecha[2]}-${corteFecha[1]}-${corteFecha[0]}`;
      let { data } = await useApi.post(
        "admision/checking_admision/validar_estudiante",
        {
          ch_apepat: apellidoPaternoModal,
          ch_apemat: apellidoMaternoModal,
          ch_celular: celularModal,
          ch_fecnac: fechaOrdenada,
          ch_ejecutiva: ejecutivaModal,
          o_moti_des: selectedMotivoDescuento.codigo,
          ch_turno: turnoModal.code,
          id: idEstudiante,
          ch_nombres: nombreModal,
          ch_dni: dniModal,
          ch_mod_ing: selectedModalidadMatricula.codigo,
        }
      );

      let estudiante_validado = noValidados.filter(
        (no_validados) => no_validados.id == idEstudiante
      );

      let tabla_actualizada = noValidados.filter(
        (no_validados) => no_validados.id != idEstudiante
      );

      setNoValidados(tabla_actualizada);
      console.log(estudiante_validado);

      const actualizar_tabla_validados = async (id_estudiante) => {
        try {
          let { data } = await useApi(
            `admision/checking_admision/validado_by_id/${id_estudiante}`
          );
          console.log(data);
          setValidados([...validados, { ...data }]);
        } catch (error) {
          console.log(error);
        }
      };
      actualizar_tabla_validados(idEstudiante);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-4">Cheking Admisión</h2>
      <div className="card">
        <Accordion multiple activeIndex={[0]} className="space-y-8">
          <AccordionTab header="No validados">
            <div className="card">
              <DataTable
                header={() =>
                  templateHeader(globalFilterValue, onGlobalFilterChange)
                }
                filters={filters}
                paginator
                rows={4}
                rowsPerPageOptions={[5, 10]}
                value={noValidados}
                showGridlines
                globalFilterFields={["ch_dni","ch_nombres"]}
                id="my-table"
              >
                {/* {columns.map((col, index) => ( */}
                <Column
                  className={` text-center`}
                  field={"id"}
                  header={"#"}
                  // header={col.header}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  // body={dynamicBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_dni"}
                  header={"DNI"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                />
                <Column
                  className={` text-center`}
                  field={"ch_nombres"}
                  header={"Nombres"}
                  // header={col.header}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  // body={dynamicBody}
                />
                <Column
                  className={` text-center`}
                  field={"abrev"}
                  header={"Carrera"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                />
                <Column
                  className={` text-center`}
                  field={"ch_validacion"}
                  header={"Validación"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={validacionBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_edni"}
                  header={"DNI"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={dniBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_dj"}
                  header={"DJ 1"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={dj1Body}
                />
                <Column
                  className={` text-center`}
                  field={"ch_secu"}
                  header={"SEC"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_secuBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"DJ 2"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_djsecuBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"MAT"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_p_matriculaBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"PC"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_p_cuotaBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"Estado Alumno"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={estadoBody}
                />
              </DataTable>
            </div>

            <Dialog
              visible={visible}
              modal
              header={headerElement}
              // footer={footerContent}
              className="w-2/3 xl:w-3/6"
              // style={{ width: "50rem" }}
              onHide={() => {
                setVisible(false);
                enableScrolling();
              }}
              headerClassName="bg-rose-700"
            >
              <div className="space-y-4 pt-4 checking_admision">
                <div className="p-inputgroup flex flex-col w-full">
                  <label
                    htmlFor="username"
                    className="font-bold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Modalidad de Matricula
                  </label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon bg-rose-700">
                      <BsArrowsAngleContract
                        style={{ scale: "1.5" }}
                        color="white"
                      />
                    </span>
                    <Dropdown
                      value={selectedModalidadMatricula}
                      onChange={(e) => setSelectedModalidadMatricula(e.value)}
                      options={modalidadIngresosModal}
                      optionLabel="nombre"
                      placeholder="Selecciona una modalidad"
                      emptyFilterMessage="No hay resultados"
                      className="overflow-auto w-full"
                      pt={{ root: { className: "font-extrabold" } }}
                      filter
                      width={100}
                    />
                  </div>
                </div>

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
                      <RiPassPendingFill
                        style={{ scale: "1.8" }}
                        color="white"
                      />
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

                <div className="p-inputgroup flex flex-col w-full">
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

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="apellido_paterno"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Apellido Paterno
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <BsGenderFemale
                          style={{ scale: "1.6" }}
                          color="white"
                        />
                      </span>
                      <InputText
                        placeholder="Paterno"
                        className="h-11 placeholder:text-sm font-bold text-sm"
                        id="apellido_paterno"
                        value={apellidoPaternoModal}
                        onChange={(event) =>
                          SetApellidoPaternoModal(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="apellido_materno"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Apellido Materno
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <BsGenderMale
                          style={{ scale: "1.6" }}
                          className="font-extrabold"
                          color="white"
                        />
                      </span>
                      <InputText
                        placeholder="Materno"
                        className="h-11 placeholder:text-sm font-bold text-sm"
                        id="apellido_materno"
                        value={apellidoMaternoModal}
                        onChange={(event) =>
                          SetApellidoMaternoModal(event.target.value)
                        }
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
                        onChange={(event) =>
                          setCelularModal(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="fecha_nacimiento"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Fecha Nacimiento
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <BsCalendar2DateFill
                          style={{ scale: "1.4" }}
                          className="font-extrabold"
                          color="white"
                        />
                      </span>
                      <Calendar
                        value={fechaNacimientoModal}
                        onChange={(e) =>
                          setFechaNacimientoModal(e.target.value)
                        }
                        placeholder="Fecha nacimiento"
                        inputId="fecha_nacimiento"
                        name="fecha_nacimiento"
                        className="h-11 placeholder:text-red-500"
                        locale="es"
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

                  <div className="flex-1">
                    <label
                      htmlFor="turno"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Turno
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <FaCloudMoon
                          style={{ scale: "1.4" }}
                          className="font-extrabold"
                          color="white"
                        />
                      </span>
                      <Dropdown
                        value={turnoModal}
                        onChange={(e) => setTurnoModal(e.value)}
                        options={turno}
                        optionLabel="name"
                        inputId="turno"
                        placeholder="Selecciona un turno"
                        emptyFilterMessage="No hay resultados"
                        className="font-bold text-sm"
                        // filter
                      />
                    </div>
                  </div>
                </div>

                <div className="p-inputgroup flex flex-col w-full">
                  <label
                    htmlFor="ejecutiva"
                    className="font-bold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Ejecutiva
                  </label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon bg-rose-700">
                      <FaSackDollar style={{ scale: "1.4" }} color="white" />
                    </span>
                    <InputNumber
                      inputId="ejecutiva"
                      value={ejecutivaModal}
                      placeholder="$"
                      onValueChange={(e) => setEjecutivaModal(e.target.value)}
                      className="h-11 placeholder:text-sm font-bold text-sm"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                    />
                  </div>
                </div>

                <div className="p-inputgroup flex flex-col w-full">
                  <label
                    htmlFor="username"
                    className="font-bold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Motivo de Descuento
                  </label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon bg-rose-700">
                      <BsPatchQuestionFill
                        style={{ scale: "1.5" }}
                        color="white"
                      />
                    </span>
                    <Dropdown
                      value={selectedMotivoDescuento}
                      onChange={(e) =>
                        setSelectedMotivoDescuento(e.target.value)
                      }
                      options={descuentosModal}
                      optionLabel="Nombre"
                      placeholder="Selecciona una motivo"
                      emptyFilterMessage="No hay resultados"
                      className="overflow-auto w-full font-bold text-sm"
                      filter
                      width={100}
                    />
                  </div>
                </div>

                <div className="flex gap-x-4 justify-end">
                  <button
                    onClick={() => {
                      setVisible(false);
                      validarEstudiante();
                      enableScrolling();
                    }}
                    className="bg-[#388E3C] text-white py-2 block mt-4 px-2 rounded-sm text-sm"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={() => {
                      setVisible(false);
                      enableScrolling();
                    }}
                    className="bg-gray-500 text-white py-2 block mt-4 px-2 rounded-sm text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Dialog>
          </AccordionTab>
          <AccordionTab header="Validados">
            <div className="card">
              <DataTable
                header={() =>
                  templateHeaderNoValidado(
                    globalFilterValueNoValidado,
                    onGlobalFilterChangeNoValidado
                  )
                }
                filters={filtersNoValidados}
                paginator
                rows={4}
                rowsPerPageOptions={[5, 10]}
                value={validados}
                showGridlines
                // footerColumnGroup={footerGroup}
                globalFilterFields={["ch_dni","ch_nombres"]}
                id="my-table-validados"
              >
                {/* {columns.map((col, index) => ( */}
                <Column
                  className={` text-center`}
                  field={"id"}
                  header={"#"}
                  // header={col.header}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  // body={dynamicBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_dni"}
                  header={"DNI"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                />
                <Column
                  className={` text-center`}
                  field={"ch_nombres"}
                  header={"Nombres"}
                  // header={col.header}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  // body={dynamicBody}
                />
                <Column
                  className={` text-center`}
                  field={"abrev"}
                  header={"Carrera"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                />
                <Column
                  className={` text-center`}
                  field={"ch_validacion"}
                  header={"Validación"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={validacionBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_edni"}
                  header={"DNI"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={dniBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_dj"}
                  header={"DJ 1"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={dj1Body}
                />
                <Column
                  className={` text-center`}
                  field={"ch_secu"}
                  header={"SEC"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_secuBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"DJ 2"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_djsecuBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"MAT"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_p_matriculaBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"PC"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={ch_p_cuotaBody}
                />
                <Column
                  className={` text-center`}
                  field={"ch_djsecu"}
                  header={"Estado Alumno"}
                  headerClassName="bg-rose-700 text-white text-xs text-center"
                  body={estadoBody}
                />
              </DataTable>
            </div>

            <Dialog
              visible={visible}
              modal
              header={headerElement}
              // footer={footerContent}
              className="w-2/3 xl:w-3/6"
              // style={{ width: "50rem" }}
              onHide={() => {
                setVisible(false);
                enableScrolling();
              }}
              headerClassName="bg-rose-700"
            >
              <div className="space-y-4 pt-4 checking_admision">
                <div className="p-inputgroup flex flex-col w-full">
                  <label
                    htmlFor="username"
                    className="font-bold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Modalidad de Matricula
                  </label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon bg-rose-700">
                      <BsArrowsAngleContract
                        style={{ scale: "1.5" }}
                        color="white"
                      />
                    </span>
                    <Dropdown
                      value={selectedModalidadMatricula}
                      onChange={(e) => setSelectedModalidadMatricula(e.value)}
                      options={modalidadIngresosModal}
                      optionLabel="nombre"
                      placeholder="Selecciona una modalidad"
                      emptyFilterMessage="No hay resultados"
                      className="overflow-auto w-full"
                      pt={{ root: { className: "font-extrabold" } }}
                      filter
                      width={100}
                    />
                  </div>
                </div>

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
                      <RiPassPendingFill
                        style={{ scale: "1.8" }}
                        color="white"
                      />
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

                <div className="p-inputgroup flex flex-col w-full">
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

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="apellido_paterno"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Apellido Paterno
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <BsGenderFemale
                          style={{ scale: "1.6" }}
                          color="white"
                        />
                      </span>
                      <InputText
                        placeholder="Paterno"
                        className="h-11 placeholder:text-sm font-bold text-sm"
                        id="apellido_paterno"
                        value={apellidoPaternoModal}
                        onChange={(event) =>
                          SetApellidoPaternoModal(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="apellido_materno"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Apellido Materno
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <BsGenderMale
                          style={{ scale: "1.6" }}
                          className="font-extrabold"
                          color="white"
                        />
                      </span>
                      <InputText
                        placeholder="Materno"
                        className="h-11 placeholder:text-sm font-bold text-sm"
                        id="apellido_materno"
                        value={apellidoMaternoModal}
                        onChange={(event) =>
                          SetApellidoMaternoModal(event.target.value)
                        }
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
                        onChange={(event) =>
                          setCelularModal(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="fecha_nacimiento"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Fecha Nacimiento
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <BsCalendar2DateFill
                          style={{ scale: "1.4" }}
                          className="font-extrabold"
                          color="white"
                        />
                      </span>
                      <Calendar
                        value={fechaNacimientoModal}
                        onChange={(e) =>
                          setFechaNacimientoModal(e.target.value)
                        }
                        placeholder="Fecha nacimiento"
                        inputId="fecha_nacimiento"
                        name="fecha_nacimiento"
                        className="h-11 placeholder:text-red-500"
                        locale="es"
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

                  <div className="flex-1">
                    <label
                      htmlFor="turno"
                      className="font-bold"
                      style={{ fontSize: ".9rem" }}
                    >
                      Turno
                    </label>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon bg-rose-700">
                        <FaCloudMoon
                          style={{ scale: "1.4" }}
                          className="font-extrabold"
                          color="white"
                        />
                      </span>
                      <Dropdown
                        value={turnoModal}
                        onChange={(e) => setTurnoModal(e.value)}
                        options={turno}
                        optionLabel="name"
                        inputId="turno"
                        placeholder="Selecciona un turno"
                        emptyFilterMessage="No hay resultados"
                        className="font-bold text-sm"
                        // filter
                      />
                    </div>
                  </div>
                </div>

                <div className="p-inputgroup flex flex-col w-full">
                  <label
                    htmlFor="ejecutiva"
                    className="font-bold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Ejecutiva
                  </label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon bg-rose-700">
                      <FaSackDollar style={{ scale: "1.4" }} color="white" />
                    </span>
                    <InputNumber
                      inputId="ejecutiva"
                      value={ejecutivaModal}
                      placeholder="$"
                      onValueChange={(e) => setEjecutivaModal(e.target.value)}
                      className="h-11 placeholder:text-sm font-bold text-sm"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                    />
                  </div>
                </div>

                <div className="p-inputgroup flex flex-col w-full">
                  <label
                    htmlFor="username"
                    className="font-bold"
                    style={{ fontSize: ".9rem" }}
                  >
                    Motivo de Descuento
                  </label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon bg-rose-700">
                      <BsPatchQuestionFill
                        style={{ scale: "1.5" }}
                        color="white"
                      />
                    </span>
                    <Dropdown
                      value={selectedMotivoDescuento}
                      onChange={(e) =>
                        setSelectedMotivoDescuento(e.target.value)
                      }
                      options={descuentosModal}
                      optionLabel="Nombre"
                      placeholder="Selecciona una motivo"
                      emptyFilterMessage="No hay resultados"
                      className="overflow-auto w-full font-bold text-sm"
                      filter
                      width={100}
                    />
                  </div>
                </div>

                <div className="flex gap-x-4 justify-end">
                  <button
                    onClick={() => {
                      setVisible(false);
                      validarEstudiante();
                      enableScrolling();
                    }}
                    className="bg-[#388E3C] text-white py-2 block mt-4 px-2 rounded-sm text-sm"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={() => {
                      setVisible(false);
                      enableScrolling();
                    }}
                    className="bg-gray-500 text-white py-2 block mt-4 px-2 rounded-sm text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Dialog>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};
