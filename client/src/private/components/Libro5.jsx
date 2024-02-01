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

export const Libro5 = () => {
  const [visible, setVisible] = useState(false);
  const [alumnoeSelected, setAlumnoSelected] = useState(null);
  const [libros, setLibros] = useState([]);
  const [filtrarAlumno, setFiltrarAlumno] = useState(null);

  const [alumnosFormateados, setAlumnosFormateados] = useState([]);

  const [fechaEmision, setFechaEmision] = useState(
    new Date().toLocaleDateString()
  );

  useEffect(() => {
    obtener_datos_libro_5();
    data_alumnos();
  }, []);

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
    try {
      let { data } = await useApi("libro/data_libro_5");
      setLibros(data);
    } catch (error) {
      console.log(error);
    }
  };
  const data_alumnos = async () => {
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
            <button className="py-2 d-block text-center rounded-sm w-full text-white bg-blue-600">
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
                    // value={fechaEmision}
                    // onChange={(event) => setFechaEmision(event.target.value)}
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
                    // value={fechaEmision}
                    // onChange={(event) => setFechaEmision(event.target.value)}
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
                    // value={fechaEmision}
                    // onChange={(event) => setFechaEmision(event.target.value)}
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
                    // onChange={(event) => setFechaEmision(event.target.value)}
                    placeholder="Fecha Emisión"
                  />
                </div>
              </div>
            </div>

            <div className="p-inputgroup flex-1 flex flex-col">
              <label htmlFor="turno" className="font-semibold d-block">
                Fecha de Emisión
              </label>
              <InputTextarea
                // value={fechaEmision}
                className="w-full resize-none"
                // onChange={(event) => setFechaEmision(event.target.value)}
                placeholder="Observación"
              />
            </div>
          </div>

          <div>
            <button className="text-white bg-green-700 rounded-sm py-2 px-4 w-full">
              Registrar
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
