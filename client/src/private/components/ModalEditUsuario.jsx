import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { TbPassword } from "react-icons/tb";
import { TbLetterCase } from "react-icons/tb";
import { VscOctoface } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { useApi } from "../../hooks/useAxios";

const ROLES = [
  { name: "Developer", idrol: 1 },
  { name: "Adminsitrador", idrol: 2 },
  { name: "Usuario", idrol: 3 },
  { name: "Decano Empresariales", idrol: 4 },
  { name: "Decano Salud", idrol: 5 },
  { name: "Decano Maestria", idrol: 6 },
  { name: "Director de Adm. y Neg. Inter.", idrol: 7 },
  { name: "Director de Adm. y Mark.", idrol: 8 },
  { name: "Director de Cont. y Finan.", idrol: 9 },
  { name: "Director de Enfermeria", idrol: 10 },
  { name: "Director de Farma. y Bioq.", idrol: 11 },
  { name: "Director de Nutri. y Diet.", idrol: 12 },
  { name: "Director de Psicologia", idrol: 13 },
  { name: "OSAR", idrol: 14 },
  { name: "Roxana Purizaca", idrol: 15 },
  { name: "Admision", idrol: 16 },
];

export const ModalEditUsuario = ({
  visible = true,
  setVisible,
  position,
  usuarioActual,
  setUsuarioActual,
  usuarios,
  setUsuarios
}) => {
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [idrol, setIdrol] = useState("");
  const [nombrerol, setNombrerol] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const toastTopCenter = useRef(null);

  useEffect(() => {
    setLoading(true);
    setNombre(usuarioActual?.nombre ?? "");
    setUsuario(usuarioActual?.usuario ?? "");
    setPassword(usuarioActual?.password ?? "");
    setIdrol(usuarioActual?.idrol ?? "");
    setNombrerol(usuarioActual?.nombrerol ?? "");
    setRolSeleccionado(
      { name: usuarioActual?.nombrerol, idrol: usuarioActual?.idrol } ?? ""
    );
    setLoading(false);

    return () => {
      // NO SIRVE DE NADA PORQUE EL COMPONENTE SE DESMONTA CUANDO VAS A OTRA PESTAÑA
      setNombre("");
      setUsuario("");
      // setUsuarioActual(null);
    };
  }, [visible]);

  const notify = () => toast.success("Usuario actualizado!");

  const guardarCambios = async () => {
    let usuarioEdit = {
      nombre: nombre,
      usuario: usuario,
      password: password,
      idrol: idrol,
    };

    try {
      let { data } = await useApi.put(
        `usuario/editar_usuario/${usuarioActual.idusuario}`,
        { usuarioEdit }
      );
      let usuariosActualiados = usuarios.map((item) =>
        item.idusuario == data.idusuario ? data : item
      );
      setUsuarios(usuariosActualiados);
      console.log({ usuarioActualizado: data });
    } catch (error) {
      console.log(error);
    }
    console.log(usuarioActual);
    setVisible(false);
    setUsuarioActual(null);
    notify();
  };

  const footerContent = (
    <div>
      <button
        onClick={() => {
          setVisible(false);
          // setUsuarioActual(null);
        }}
        className="p-button-text bg-red-500 text-white py-2 rounded-md px-4"
      >
        Cancelar
      </button>
      <button
        onClick={guardarCambios}
        autoFocus
        className="bg-yellow-600 text-white py-2 rounded-md px-4"
      >
        Guardar
      </button>
    </div>
  );

  if (loading) return;

  return (
    <>
      <ToastContainer
        autoClose={2000}
        // toastStyle={{ backgroundColor: "#379237", color: "#fff" }}
      />

      <Dialog
        header="Formulario de edición"
        visible={visible}
        position={position}
        className="w-[80%] md:w-[50%] text-center"
        onHide={() => {
          setVisible(false);
          // setUsuarioActual(null);
        }}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <form className="space-y-4">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <TbLetterCase size={20} color="white" />
            </span>
            <InputText
              placeholder="Nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <FiUser size={20} color="white" />
            </span>
            <InputText
              placeholder="Usuario"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <TbPassword size={20} color="white" />
            </span>
            <InputText
              placeholder="Password"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <VscOctoface size={20} color="white" />
            </span>
            <Dropdown
              value={rolSeleccionado}
              onChange={(e) => {
                setRolSeleccionado(e.target.value);
              }}
              options={ROLES}
              optionLabel="name"
              placeholder="Selecciona una carrera"
              emptyFilterMessage="No hay resultados"
              className="flex-1 overflow-auto w-full"
              filter
              // width={100}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};
