import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { Divider } from "primereact/divider";
import { TbListLetters } from "react-icons/tb";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ToastContainer, toast } from "react-toastify";

export const Libro5 = () => {
  const [visible, setVisible] = useState(false);
  const [alumnoeSelected, setAlumnoSelected] = useState("");
  const [libros, setLibros] = useState([]);
  const [filtrarAlumno, setFiltrarAlumno] = useState("");

  const [nombresModal, setNombresModal] = useState("");
  const [periodoEgresoModal, setPeriodoEgresoModal] = useState("");
  const [carreraModal, setCarreraModal] = useState("");
  const [observacionModal, setObservacionModal] = useState("");

  const [alumnosFormateados, setAlumnosFormateados] = useState([]);

  const [fechaEmision, setFechaEmision] = useState(
    new Date().toLocaleDateString()
  );

  useEffect(() => {
    obtener_datos_libro_5();
    data_alumnos();
  }, []);

  const toast_usuario_agregado = () => toast.success("Registro agregado!");

  const itemTemplate = (item) => {
    return (
      <div className="flex align-items-center w-[600px]">
        <div className="font-normal text-xs space-x-4 m-0 p-0 flex w-full">
          <span className="py-1 px-2 w-[15%] rounded-sm bg-purple-500 text-white">
            {item.nombres.split("|")[0]}
          </span>
          <span className="py-1 px-2 flex-1 rounded-sm bg-green-800 text-white">
            {item.nombres.split("|")[1]}
          </span>
          <span className="py-1 px-2 w-[30%] rounded-sm bg-orange-500 text-white">
            {item.nombres.split("|")[2]}
          </span>
        </div>
      </div>
    );
  };

  const rellenar_estudiante = async () => {
    // console.log(alumnoeSelected.nombres)
    if (filtrarAlumno.trim() == "") return alert("ESCRIBA UNA COINCIDENCIA");

    let codigo = alumnoeSelected.nombres.split("|")[0].trim();
    let nombres = alumnoeSelected.nombres.split("|")[1].trim().split(" ");
    let carrera = alumnoeSelected.nombres.split("|")[2].trim();

    let nombres_coma = ``;
    nombres.forEach((element, index) => {
      if (index == 0) {
        nombres_coma += `${nombres[index]} `;
      }

      if (index == 1) {
        nombres_coma += `${nombres[index]}`;
      }

      if (index == 2) {
        nombres_coma += `, ${nombres[index]} `;
      }

      if (index == 3) {
        nombres_coma += `${nombres[index]}`;
      }
    });

    // nombres_coma = `${nombres[0]} ${nombres[1]}, ${nombres[2]} ${nombres[3]}`;
    try {
      let { data } = await useApi.post("/libro/alumno_filtro_libro_5", {
        codigo,
        nombres: nombres_coma.trim(),
        carrera,
      });
      if (typeof data == "string") {
        return alert(data);
      }
      setNombresModal(
        `${data.estudiante.paterno} ${data.estudiante.materno} ${data.estudiante.nombres}`
      );
      setCarreraModal(data.estudiante.nomesp);
      setPeriodoEgresoModal(data.periodo);
      if (`${data.periodo}`.slice(-1) == 2) {
        setPeriodoEgresoModal(`${data.periodo}`.slice(0, 4) + "-II");
      } else {
        setPeriodoEgresoModal(`${data.periodo}`.slice(0, 4) + "-I");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cleanModal = () => {
    setNombresModal("");
    setCarreraModal("");
    setObservacionModal("");
    setPeriodoEgresoModal("");
    setAlumnoSelected("");
    setVisible(false);
  };

  const search = (event) => {
    let _filtrarAlumno;
    setTimeout(async () => {
      if (!event.query.trim().length) {
        _filtrarAlumno = [];
      } else {
        _filtrarAlumno = alumnosFormateados.filter((item) => {
          return item.nombres.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFiltrarAlumno(_filtrarAlumno);
    }, 1000);
  };

  const obtener_datos_libro_5 = async () => {
    const token = await JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      let { data } = await useApi("libro/data_libro_5",config);
      setLibros(data);
    } catch (error) {
      console.log(error);
    }
  };

  const data_alumnos = async () => {

    const token = await JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      let { data } = await useApi("libro/data_alumnos");
      let data_formateada = [];
      data_formateada = data.map((item) => {
        return {
          nombres: `${item.codigo} | ${item.nombres} | ${item.nomesp}`,
        };
      });
      // setAlumnos(data);
      setAlumnosFormateados(data_formateada);
    } catch (error) {
      console.log(error);
    }
  };

  const registrarAlumnoLibro5 = async () => {
    // VALIDACIÓN SIMPLE DE CAMPOS VACIOS
    if (
      [
        nombresModal.trim(),
        observacionModal.trim(),
        periodoEgresoModal.trim(),
        fechaEmision.trim(),
      ]
    ) {
      alert("RELLENE TODOS LOS CAMPOS PROFAVOR!");
      return;
    }

    try {
      await useApi.post("/libro/registrar_libro_5", {
        nombres: nombresModal,
        observacion: observacionModal,
        periodo: periodoEgresoModal,
        fecha_emision: `${fechaEmision}`,
        carrera: carreraModal,
      });
      cleanModal();
      toast_usuario_agregado();
    } catch (error) {
      console.log(error);
    } finally {
      obtener_datos_libro_5();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-medium">Libro 5</h2>
      <button
        className="bg-green-600 text-white rounded-sm py-2 px-4"
        onClick={() => setVisible(true)}
      >
        Agregar
      </button>
      <Card>
        <DataTable
          value={libros}
          showGridlines
          rows={5}
          paginator
          cellClassName="font-semibold"
        >
          <Column
            field="numero_correlativo"
            headerClassName="bg-rose-700 text-white border-rose-700"
            header="N°"
            className="border-rose-300"
          />
          <Column
            field="numero_folio"
            headerClassName="bg-rose-700 text-white border-rose-700"
            header="N° Folio"
            className="border-rose-300 w-24"
          />
          <Column
            field="nombres"
            headerClassName="bg-rose-700 text-white border-rose-700"
            header="Nombres"
            className="border-rose-300"
          />
          <Column
            field="carrera"
            headerClassName="bg-rose-700 text-white border-rose-700"
            header="Carrera"
            className="border-rose-300"
          />
          <Column
            field="periodo_egreso"
            headerClassName="bg-rose-700 text-white border-rose-700"
            header="Periodo Egreso"
            className="border-rose-300"
          />
          <Column
            field="fecha_emision"
            headerClassName="bg-rose-700 text-white border-rose-700"
            header="Fecha Emisión"
            className="border-rose-300"
          />
        </DataTable>
        <ToastContainer
          autoClose={2000}
          // toastStyle={{ backgroundColor: "#379237", color: "#fff" }}
        />
      </Card>

      <Dialog
        header="FORMULARIO DE REGISTRO - LIBRO 5"
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[700px]"
      >
        <div className="space-y-4 py-5">
          <div className="flex flex-col w-full">
            <label htmlFor="turno" className="font-semibold d-block">
              Filtro
            </label>
            <AutoComplete
              field="nombres"
              value={alumnoeSelected}
              suggestions={filtrarAlumno}
              selectionLimit={10}
              completeMethod={search}
              onChange={(e) => setAlumnoSelected(e.value)}
              className="contenedor_filtro"
              placeholder="Busqueda del alumno"
              itemTemplate={itemTemplate}
            />
          </div>
          <Divider />
          <div className="flex gap-x-6">
            <button
              onClick={rellenar_estudiante}
              className="py-2 d-block text-center rounded-sm w-full text-white bg-blue-600"
            >
              Rellenar
            </button>
            <button
              onClick={() => setAlumnoSelected("")}
              className="py-2 d-block text-center rounded-sm w-full text-white bg-red-600"
            >
              Limpiar
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-x-6">
              <div className="flex-1">
                <label htmlFor="turno" className="font-semibold d-block">
                  Alumno
                </label>
                <div className="p-inputgroup flex-1">
                  <InputText
                    value={nombresModal}
                    onChange={(event) => setNombresModal(event.target.value)}
                    placeholder="Nombre"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label htmlFor="turno" className="font-semibold d-block">
                  Carrera
                </label>
                <div className="p-inputgroup flex-1">
                  <InputText
                    value={carreraModal}
                    onChange={(event) => setCarreraModal(event.target.value)}
                    placeholder="Carrera"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-x-6">
              <div className="flex-1">
                <label htmlFor="turno" className="font-semibold d-block">
                  Periodo de egreso
                </label>
                <div className="p-inputgroup flex-1">
                  <InputText
                    value={periodoEgresoModal}
                    onChange={(event) =>
                      setPeriodoEgresoModal(event.target.value)
                    }
                    placeholder="Nombre"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label htmlFor="turno" className="font-semibold d-block">
                  Fecha de Emisión
                </label>
                <div className="p-inputgroup flex-1">
                  <InputText
                    value={fechaEmision}
                    onChange={(event) => setFechaEmision(event.target.value)}
                    placeholder="Fecha Emisión"
                  />
                </div>
              </div>
            </div>

            <div className="p-inputgroup flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold d-block">
                Observación
              </label>
              <InputTextarea
                value={observacionModal}
                className="w-full resize-none"
                onChange={(event) => setObservacionModal(event.target.value)}
                placeholder="Observación"
              />
            </div>
          </div>

          <div>
            <button
              onClick={registrarAlumnoLibro5}
              className="text-white bg-green-700 rounded-sm py-2 px-4 w-full"
            >
              Registrar
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
