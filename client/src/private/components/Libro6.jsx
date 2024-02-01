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

const opciones = [
  { name: "ASISTENTE", code: "ASISTENTE" },
  { name: "PONENTE", code: "PONENTE" },
];

export const Libro6 = () => {
  // REFS
  const fileUpload = useRef(null);
  const file = useRef(null);

  const toastConfirm = useRef(null);

  const [actionModal, setActionModal] = useState(false);
  const [selectedParticipacion, setSelectedParticipacion] = useState("");
  const [creditosModal, setCreditosModal] = useState("");
  const [nombreTallerModal, setNombreTallerModal] = useState("");
  const [fechaTaller, setFechaTaller] = useState("");
  const [escuelaOrganizada, setEscuelaOrganizada] = useState("");
  const [fechaEmision, setFechaEmision] = useState(new Date().toLocaleDateString());

  const [loading, setLoading] = useState(true);
  const [libros, setLibros] = useState([]);

  const toastLibroRegistrado = () => toast.success("Libro Registrado");

  const obtener_datos_libro_6 = async () => {
    setLoading(true);
    try {
      let { data } = await useApi("libro/data_libro_6");
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
      toastLibroRegistrado();
    } catch (error) {
      console.log(error);
    }finally{
      obtener_datos_libro_6();
    }
  };

  const uploadLibro6 = async (event) => {
    event.preventDefault();

    if (
      [
        creditosModal.trim(),
        nombreTallerModal.trim(),
        // fechaTaller.trim(),
        escuelaOrganizada.trim(),
        fechaEmision.trim(),
      ].some((field) => field == "")
    ) {
      alert("complete todos los campos porfavor!!!");
      return;
    }

    if (fechaTaller.length == 0) {
      alert("Agregue el rango de fechas");
      return;
    }

    if (selectedParticipacion.code == undefined) {
      alert("Seleccion el tipo de participación");
      return;
    }

    if (fileUpload.current.getFiles().length == 0) {
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
        "/libro/registrar_libro_6",
        {
          creditos: creditosModal,
          fechaEmision,
          fechaTaller: `${new Date(fechaTaller[0]).toLocaleDateString()} - ${new Date(fechaTaller[1]).toLocaleDateString()}`,
          participacion: selectedParticipacion.code,
          escuelaOrganizadora: escuelaOrganizada,
          nombreTaller: nombreTallerModal,
          archivo: fileUpload.current.getFiles()[0],
        },
        config
      );
    } catch (error) {
      console.log(error);
    }finally {
      obtener_datos_libro_6();
      setActionModal(true)
      setTimeout(() => {
        setActionModal(false)
      }, 4500);
    }
  };

  const modal = () => {
    return (
      <div className="h-[100vh] bg-black w-full z-40 absolute top-0">
        <h1 className="text-6xl">qweqwes</h1>
       
      </div>
    );
  };

  if (actionModal) {
    return (
      <div className="h-[100vh] bg-white w-full z-40 left-0 absolute top-0 flex flex-col justify-center items-center space-y-3">
        <h2 className="text-5xl font-bold">Se esta subiendo el archivo, mi rey!</h2>
        <img src={"/gatito.gif"} alt="gatito_besucon" className="border-2 border-white" />
      </div>
    );
  }

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
                  onChange={(event) => setCreditosModal(event.target.value)}
                  placeholder="Créditos"
                />
              </div>

              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon bg-rose-700 overflow-hidden">
                  <TbListLetters className="text-white scale-150" />
                </span>
                <Calendar value={fechaTaller} placeholder="Fecha de taller desde - hasta" onChange={(e) => setFechaTaller(e.value)} selectionMode="range" readOnlyInput />
                {/* <InputText
                  value={fechaTaller}
                  
                  onChange={(event) => setFechaTaller(event.target.value)}
                  placeholder="Fecha del taller"
                /> */}
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
                // url={ uploadLibro6 }
                ref={fileUpload}
                // onClick={ () => alert('s') }
                // accept="xlsx/*"
                // maxFileSize={1000000}
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
          showGridlines
          rows={5}
          rowsPerPageOptions={[5, 10]}
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
        </DataTable>
        <ToastContainer autoClose={1200} />
      </Card>
    </div>
  );
};
