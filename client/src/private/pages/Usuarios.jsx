import { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaFilter } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useApi } from "../../hooks/useAxios";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { ModalEditUsuario } from "../components/ModalEditUsuario";
import { Toast } from "primereact/toast";
import { ToastContainer, toast } from "react-toastify";
import { SpinnerYinYang } from "../components/SpinnerYinYang";

export const Usuarios = () => {
  // STATES DEL MODAL EDITAR USUARIO
  const [position, setPosition] = useState("center");
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActivado, setUsuarioActivado] = useState(null);

  // CURRENT USER
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toastConfirm = useRef(null);

  useEffect(() => {
    const get_users = async () => {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("user"));

      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      };

      try {
        let { data } = await useApi("/usuario/get_usuarios", config);
        setUsuarios(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    get_users();
  }, []);

  // TOAST MESSAGE USUARIO ELIMINADO;
  const toast_usuario_eliminado = () => toast.error("Usuario Eliminado!");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const rendeHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-slate-500">Administrar Usuarios</h2>
        <div className="p-inputgroup w-[250px]">
          <span className="p-inputgroup-addon">
            <FaFilter />
          </span>
          <InputText
            type="search"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Filtro global"
          />
        </div>
      </div>
    );
  };

  let header = rendeHeader();

  if (loading) return;

  const cambiarEstado = async (estado, idusuario) => {
    try {
      let { data } = await useApi.put(`/usuario/cambiar_estado/${estado}`, {
        idusuario,
      });
      let usuariosActualiados = usuarios.map((item) =>
        item.idusuario == data.idusuario ? data : item
      );
      setUsuarios(usuariosActualiados);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonState = ({ estado, idusuario }) => {
    return (
      <button
        className={`text-white w-full py-2 rounded-sm ${
          estado == 1 ? "bg-green-500" : "bg-red-600"
        } `}
        onClick={() => cambiarEstado(estado, idusuario)}
      >
        {estado == 1 ? "Activo" : "Desactivado"}
      </button>
    );
  };

  const buttonActions = (usuario) => {
    return (
      <div className="flex justify-center">
        <button onClick={() => confirm(usuario.idusuario)}>
          <FaTrashCan size={20} />
        </button>
        <button onClick={() => show(usuario)}>
          <MdEdit className="" size={20} />
        </button>
      </div>
    );
  };

  const confirm = (idusuario) => {
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
              onClick={() => borrarUsuario(idusuario)}
              className="px-4 py-2 text-white rounded-sm text-md font-semibold bg-[#FE0000]"
            >
              Confirmar
            </button>
          </div>
        ),
      });
    }
  };

  const clear = async () => {
    toastConfirm.current.clear();
    setVisibleConfirm(false);
  };

  const borrarUsuario = async (idusuario) => {
    clear();
    console.log("usuario eliminado ", idusuario);
    try {
      let { data } = await useApi.delete(
        `usuario/eliminar_usuario/${idusuario}`
      );

      let usuarioActualizado = usuarios.filter(
        (item) => item.idusuario != data
      );
      setUsuarios(usuarioActualizado);
    } catch (error) {
      console.log(error);
    } finally {
      toast_usuario_eliminado();
    }
  };

  const show = (usuario) => {
    // setPosition(position);
    setUsuarioActual(usuario);
    setVisible(true);
  };

  return (
    <div className="w-full flex justify-center">
      <Toast ref={toastConfirm} position="bottom-center" onRemove={clear} />
      <ToastContainer
        autoClose={2000}
        // toastStyle={{ backgroundColor: "#379237", color: "#fff" }}
      />

      <Card className="w-[90%]">
        <DataTable
          className="p-0 m-0"
          paginator
          value={usuarios}
          scrollable
          dataKey="idusuario"
          filters={filters}
          showGridlines
          globalFilterFields={["nombre", "usuario", "estado", "nombrerol"]}
          header={header}
          emptyMessage="No hay resultados"
          rows={4}
          rowsPerPageOptions={[5, 10]}
        >
          <Column field="idusuario" header="#"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="usuario" header="Usuario"></Column>
          <Column field="nombrerol" header="Rol"></Column>
          <Column field="ultimo_login" header="Ultimo login"></Column>
          <Column field="estado" header="Estado" body={buttonState} />
          <Column field="" header="Acciones" body={buttonActions} />
        </DataTable>

        <ModalEditUsuario
          visible={visible}
          setVisible={setVisible}
          position={"center"}
          usuarioActual={usuarioActual}
          setUsuarioActual={setUsuarioActual}
          usuarios={usuarios}
          setUsuarios={setUsuarios}
        />
      </Card>
    </div>
  );
};
