import React, { useEffect, useRef, useState } from "react";
import { TiUploadOutline } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import { useApi } from "../../hooks/useAxios";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { MdOutlineNumbers } from "react-icons/md";
import { TbListLetters } from "react-icons/tb";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { MdEdit } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { FilterMatchMode } from "primereact/api";
import { FaFilter } from "react-icons/fa6";

const opciones = [
  { name: "ASISTENTE", code: "ASISTENTE" },
  { name: "PONENTE", code: "PONENTE" },
];

export const Libro6 = () => {
  // REFS
  const fileUpload = useRef(null);
  const file = useRef(null);

  const toastConfirm = useRef(null);
  const toasteError = useRef(null);

  const [visible, setVisible] = useState(false);

  // const toastConfirm = useRef(null);

  const [actionModal, setActionModal] = useState(false);
  const [selectedParticipacion, setSelectedParticipacion] = useState("");
  const [creditosModal, setCreditosModal] = useState("");
  const [nombreTallerModal, setNombreTallerModal] = useState("");
  const [fechaTaller, setFechaTaller] = useState("");
  const [escuelaOrganizada, setEscuelaOrganizada] = useState("");
  const [fechaEmision, setFechaEmision] = useState(
    new Date().toLocaleDateString()
  );

  // STATES MODAL EDITAR
  const [idEditar, setIdEditar] = useState("");
  const [nombreEditar, setNombreEditar] = useState("");
  const [escuelaEditar, setEscuelaEditar] = useState("");
  const [tallerEditar, setTallerEditar] = useState("");
  const [notaEditar, setNotaEditar] = useState("");
  const [creditosEditar, setCreditosEditar] = useState("");
  const [fechaTallerEditar, setFechaTallerEditar] = useState("");
  const [FechaEmisionEditar, setFechaEmisionEditar] = useState("");
  const [observacionEditar, setObservacionEditar] = useState("");

  const [loading, setLoading] = useState(true);
  const [libros, setLibros] = useState([]);

  // FILTRO
  const [filtersLibro6, setFiltersLibro6] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValueFiltro6, setGlobalFilterValueFiltro6] = useState([]);

  const onGlobalFilterChangeLibro6 = (e) => {
    const value = e.target.value;
    let _filters = { ...filtersLibro6 };

    _filters["global"].value = value;

    setFiltersLibro6(_filters);
    setGlobalFilterValueFiltro6(value);
  };

  const toastLibroRegistrado = () => toast.success("Libro Registrado");
  const showMessageEmptyFields = () => toast.error("Rellene todo los campos");
  const toastLibroActualizado = () => toast.success("Registro actualizado!");

  const obtener_datos_libro_6 = async () => {
    setLoading(true);

    const token = await JSON.parse(localStorage.getItem("user"));

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      let { data } = await useApi("libro/data_libro_6", config);
      setLibros(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtener_datos_libro_6();
  }, []);

  const clear = async () => {
    toastConfirm.current.clear();
    setVisibleConfirm(false);
  };

  const subirLibro6 = async (event, file) => {
    event.preventDefault();

    if (file.current.files[0] == undefined) {
      alert("Suba un archivo");
      return;
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await useApi.post(
        `upload/subir_libro_6`,
        { file: file.current.files[0] },
        config
      );
    } catch (error) {
      console.log(error);
    } finally {
      obtener_datos_libro_6();
    }
  };

  const uploadLibro6 = async (event) => {
    event.preventDefault();

    if (
      [
        creditosModal.trim(),
        nombreTallerModal.trim(),
        escuelaOrganizada.trim(),
        fechaEmision.trim(),
      ].some((field) => field == "")
    ) {
      showMessageEmptyFields();

      return;
    }

    if (fechaTaller.length == 0) {
      showMessageEmptyFields();
      return;
    }

    if (selectedParticipacion.code == undefined) {
      return;
    }

    if (fileUpload.current.getFiles().length == 0) {
      showMessageEmptyFields();
      return;
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await useApi.post(
        "/libro/registrar_libro_6",
        {
          creditos: creditosModal,
          fechaEmision,
          fechaTaller: `${new Date(
            fechaTaller[0]
          ).toLocaleDateString()} - ${new Date(
            fechaTaller[1]
          ).toLocaleDateString()}`,
          participacion: selectedParticipacion.code,
          escuelaOrganizadora: escuelaOrganizada,
          nombreTaller: nombreTallerModal,
          archivo: fileUpload.current.getFiles()[0],
        },
        config
      );
    } catch (error) {
      console.log(error);
    } finally {
      obtener_datos_libro_6();
      setActionModal(true);

      setCreditosModal("");
      setEscuelaOrganizada("");
      setNombreTallerModal("");
      setTimeout(() => {
        setActionModal(false);
      }, 4500);
      setTimeout(() => {
        toastLibroRegistrado();
      }, 4550);
      setFechaTaller("");
    }
  };

  if (actionModal) {
    return (
      <div className="h-[100vh] bg-white w-full left-0 absolute top-0 flex flex-col justify-center items-center space-y-3 z-20">
        <h2 className="text-5xl font-bold">
          Se esta subiendo el archivo, mi rey!
        </h2>
        <img
          src={"/gatito.gif"}
          alt="gatito_besucon"
          className="border-2 border-white"
        />
      </div>
    );
  }

  const searchUser = async ({ id }) => {
    console.log(id);
    try {
      let { data } = await useApi.post(`/libro/filter_user_by_id/${id}`);
      setIdEditar(data.id);
      setNombreEditar(data.nombres);
      setEscuelaEditar(data.escuela_organizadora);
      setTallerEditar(data.nombre_taller);
      setNotaEditar(data.nota);
      setCreditosEditar(data.creditos);
      setFechaTallerEditar(data.fecha_taller);
      setFechaEmisionEditar(data.fecha_emision);
      setObservacionEditar(data.observacion);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarRegistro = async () => {
    try {
      await useApi.put(`/libro/actualizar_registro_libro_6/${idEditar}`, {
        nombres: nombreEditar,
        nombre_taller: tallerEditar,
        nota: notaEditar,
        escuela_organizadora: escuelaEditar,
        fechaTaller: fechaTallerEditar,
        creditos: creditosEditar,
        observacion: observacionEditar,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
      obtener_datos_libro_6();
      toastLibroActualizado();
    }
  };

  const templateHeader = (globalFilter, globalFilterAction) => (
    <div className="flex justify-end">
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

  const accionesTemplate = (data) => {
    return (
      <div className="flex">
        <button
          onClick={() => {
            searchUser(data);
            setVisible(true);
          }}
          className="scale-150 bg-blue-600 text-white p-1 rounded-sm mx-auto"
        >
          <MdEdit />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">Formulario Libro 6</h2>
      <Card className="card py-2">
        <form onSubmit={uploadLibro6} className="w-full">
          <div className="space-y-4">
            <div className="flex gap-x-6">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <Dropdown
                  value={selectedParticipacion}
                  onChange={(e) => setSelectedParticipacion(e.value)}
                  options={opciones}
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
                  value={nombreTallerModal}
                  onChange={(event) => setNombreTallerModal(event.target.value)}
                  className="placeholder:text-sm"
                  placeholder="Nombre del taller"
                />
              </div>
            </div>
            <div className="flex gap-x-6">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={creditosModal}
                  keyfilter="int"
                  onChange={(event) => setCreditosModal(event.target.value)}
                  className="placeholder:text-sm"
                  placeholder="Créditos"
                  maxLength={2}
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700 overflow-hidden">
                  <TbListLetters className="text-white scale-150" />
                </span>
                <Calendar
                  value={fechaTaller}
                  placeholder="Fecha de taller desde - hasta"
                  onChange={(e) => setFechaTaller(e.value)}
                  selectionMode="range"
                  showButtonBar
                  // readOnlyInput
                />
              </div>
            </div>
            <div className="flex gap-x-6">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={escuelaOrganizada}
                  onChange={(event) => setEscuelaOrganizada(event.target.value)}
                  placeholder="Escuela Organizadora"
                  className="placeholder:text-sm"
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700 overflow-hidden">
                  <TbListLetters className="text-white scale-150" />
                </span>
                <InputText
                  value={fechaEmision}
                  onChange={(event) => setFechaEmision(event.target.value)}
                  placeholder="Fecha emisión"
                />
              </div>
            </div>
            <div className="upload_section">
              <FileUpload
                ref={fileUpload}
                emptyTemplate={
                  <p className="m-0 text-center font-semibold">
                    Escoge un archivo
                  </p>
                }
              />
            </div>
          </div>
          <button className=" py-2 text-white tex-center rounded-sm bg-rose-700 w-full mt-2 font-medium">
            {" "}
            Registrar Libro{" "}
          </button>
        </form>
      </Card>

      {/* <form
        className="flex flex-col gap-y-4 w-[400px]"
        onSubmit={(event) => {
          subirLibro6(event, file);
          file.current.value = "";
        }}
      >
        <input
          type="file"
          ref={file}
          name="archivo"
          className="block w-full border bg-gray-50 border-gray-300 rounded-md h-12 file:h-full file:bg-green-700 file:text-white file:border-none file:px-4 cursor-pointer file:cursor-pointer dark:text-gray-400"
        />
        <button className="flex w-full bg-green-600 text-white py-2 rounded-sm items-center justify-center gap-x-2">
          <TiUploadOutline />
          Subir CSV
        </button>
      </form> */}

      <Card>
        <DataTable
          value={libros}
          paginator
          header={() =>
            templateHeader(globalFilterValueFiltro6, onGlobalFilterChangeLibro6)
          }
          globalFilterFields={[
            "nombres",
            "fecha_taller",
            "escuela_organizadora",
            "participacion",
            "nombre_taller",
            "nota",
            "creditos",
            "fecha_emision",
          ]}
          showGridlines
          filters={filtersLibro6}
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
        >
          <Column
            field="numero_folio"
            header="N° folio"
            headerClassName="bg-rose-700 text-white rounded-l"
          />
          <Column
            field="nombres"
            header="Nombre completo"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="nota"
            header="Nota"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="nombre_taller"
            header="Taller"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="creditos"
            header="Créditos"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="fecha_taller"
            header="Fecha del Taller"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="escuela_organizadora"
            header="Escuela Organizada"
            headerClassName="bg-rose-700 text-white"
          />
          <Column
            field="fecha_emision"
            header="Fecha emisión"
            headerClassName="bg-rose-700 text-white rounded-r"
          />
          <Column
            field="null"
            header="Acciones"
            headerClassName="bg-rose-700 text-white rounded-r"
            body={accionesTemplate}
          />
        </DataTable>
        <ToastContainer autoClose={1200} />

        <Dialog
          header="Header"
          visible={visible}
          className="w-[80%] md:w-[750px]"
          onHide={() => setVisible(false)}
        >
          <div className="mt-6 space-y-6">
            <div className="flex gap-x-6">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={nombreEditar}
                  onChange={(event) => setNombreEditar(event.target.value)}
                  placeholder="Nombre completo"
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={escuelaEditar}
                  onChange={(event) => setEscuelaEditar(event.target.value)}
                  placeholder="Escuela Organizadora"
                />
              </div>
            </div>

            <div className="flex gap-x-6">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={tallerEditar}
                  onChange={(event) => setTallerEditar(event.target.value)}
                  placeholder="Taller"
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={notaEditar}
                  onChange={(event) => setNotaEditar(event.target.value)}
                  placeholder="Nota"
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={creditosEditar}
                  onChange={(event) => setCreditosEditar(event.target.value)}
                  placeholder="Créditos"
                />
              </div>
            </div>

            <div className="flex gap-x-6">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={fechaTallerEditar}
                  onChange={(event) => fechaTallerEditar(event.target.value)}
                  placeholder="Fecha del Taller"
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700">
                  <MdOutlineNumbers className="text-white" />
                </span>
                <InputText
                  value={FechaEmisionEditar}
                  onChange={(event) =>
                    setFechaEmisionEditar(event.target.value)
                  }
                  placeholder="Fecha Emisión"
                />
              </div>
            </div>

            <InputTextarea
              value={observacionEditar}
              onChange={(e) => setObservacionEditar(e.target.value)}
              placeholder="Observación"
              className="w-full resize-none"
              rows={5}
              cols={30}
            />

            <button
              onClick={actualizarRegistro}
              className="w-full rounded-sm text-center bg-rose-700 text-white py-2  font-semibold"
            >
              Actualizar
            </button>
          </div>
        </Dialog>
      </Card>
    </div>
  );
};
