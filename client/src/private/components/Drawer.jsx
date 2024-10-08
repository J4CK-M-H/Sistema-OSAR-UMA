import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";
import { PRIVATE } from "../../rutas/routes";
import React, { useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import AuthContext from "../../context/AuthContext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { FaArrowTurnDown } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { FiBook } from "react-icons/fi";
import { FaCalendarMinus } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiCertificateDuotone } from "react-icons/pi";

export const Drawer = ({ visible, setVisible }) => {
  const { auth, loadingAuth } = useContext(AuthContext);
  console.log(auth)
  if (loadingAuth) return;

  const customHeader = (
    <React.Fragment>
      <h2 className="text-xl font-extrabold capitalize">
        Hola, {auth?.nombre}
      </h2>
    </React.Fragment>
  );

  const templateReporte = () => {
    return (
      <>
        <div className="-my-2 flex items-center">
          <HiDocumentDuplicate className="mr-4" size={25} />
          <span className="block mr-2 font-semibold text-slate-600">
            Reporte UMA
          </span>
          <FaArrowTurnDown size={15} />
        </div>
      </>
    );
  };

  const templateAdmision = () => {
    return (
      <>
        <div className="-my-2 flex items-center">
          <FaListAlt className="mr-4" size={25} />
          <span className="block mr-2 font-semibold text-slate-600">
            Admision
          </span>
          <FaArrowTurnDown size={15} />
        </div>
      </>
    );
  };

  const templateLibros = () => {
    return (
      <>
        <div className="-my-2 flex items-center">
          <LuBookMarked className="mr-4" size={25} />
          <span className="block mr-2 font-semibold text-slate-600">
            Libros
          </span>
          <FaArrowTurnDown size={15} />
        </div>
      </>
    );
  };

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      header={customHeader}
      color="red"
      className="overflow-auto sidebar drawer"
    >
      <div>
        <Divider />
        <Link
          onClick={() => setVisible(false)}
          to={`${PRIVATE.HOME}`}
          className="py-3 px-6 flex items-center gap-x-4 border-white hover:bg-slate-100 border-l-8 hover:border-rose-700"
        >
          <FaChartBar size={25} />
          <span className="font-semibold text-slate-600">Home</span>
        </Link>
        <Divider />
        {(auth?.idrol == 1 || auth?.idrol == 2) && (
          // ((auth?.nombrerol).toUpperCase() == 'DEVELOPER' || 'ADMINISTRADOR' ) && (

          <Link
            onClick={() => setVisible(false)}
            to={`${PRIVATE.USUARIOS}`}
            className="py-3 px-6 flex items-center gap-x-4 border-white hover:bg-slate-100 border-l-8 hover:border-rose-700"
          >
            <FaUsers size={25} />
            <span className="font-semibold">Usuarios</span>
          </Link>
        )}
        <Divider />
        {(auth?.idrol == 1 || auth?.idrol == 2 || auth?.idrol == 14) && (
          // ((auth?.nombrerol).toUpperCase() == 'DEVELOPER' || 'ADMINISTRADOR' ) && (

          <Accordion className="">
            <AccordionTab headerTemplate={templateReporte}>
              <div className="flex flex-col  justify-center">
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.REPORTES_UMA}/${PRIVATE.REPORTE_ALUMNOS}`}
                  className="flex items-center gap-x-4 hover:bg-slate-100 py-2 pl-10"
                >
                  <IoDocumentTextSharp size={20} />
                  <span className="font-semibold py-2 text-sm">
                    Reportes ALUMNOS
                  </span>
                </Link>
                <Divider />
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.REPORTES_UMA}/${PRIVATE.REPORTE_SUNEDU_MINEDU}`}
                  className="flex items-center gap-x-4 hover:bg-slate-100 py-2 pl-10"
                >
                  <IoDocumentTextSharp size={20} />
                  <span className="font-semibold py-2 text-sm">
                    Reportes SUNEDU MINEDU
                  </span>
                </Link>
              </div>
            </AccordionTab>
          </Accordion>
        )}
        {(auth?.idrol == 1 || auth?.idrol == 2 || auth?.idrol == 16) && (
          // ((auth?.nombrerol).toUpperCase() == 'DEVELOPER' || 'ADMINISTRADOR' ) && (
          <Accordion className="bg-white">
            <AccordionTab
              className="bg-white "
              contentStyle={{ backgroundColor: "#fff" }}
              headerTemplate={templateAdmision}
            >
              <div className="flex flex-col  justify-center ">
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.ADMISION}/${PRIVATE.ADMISION_CHEKING_LIST}`}
                  className="flex items-center  gap-x-4 hover:bg-slate-100 py-2 pl-10"
                >
                  <IoDocumentTextSharp size={20} />
                  <span className="font-semibold py-2 text-sm">
                    Checking Admisión
                  </span>
                </Link>
                <Divider />
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.ADMISION}/${PRIVATE.ADMISION_LISTA_ADMISION}`}
                  className="flex items-center gap-x-4 hover:bg-slate-200 py-2 pl-10"
                >
                  <IoDocumentTextSharp size={20} />
                  <span className="font-semibold py-2 text-sm">
                    Lista Admisión
                  </span>
                </Link>
                <Divider />
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.ADMISION}/${PRIVATE.ADMISION_REPORTE_ADMISION}`}
                  className="flex items-center gap-x-4 hover:bg-slate-200 py-2 pl-10"
                >
                  <IoDocumentTextSharp size={20} />
                  <span className="font-semibold py-2 text-sm">
                    Reporte Admisión
                  </span>
                </Link>
                <Divider />
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.ADMISION}/${PRIVATE.ADMISION_ADMINISTRACION_PROYECCION_ADMISION}`}
                  className="flex items-center gap-x-4 hover:bg-slate-200 py-2 pl-10"
                >
                  <IoDocumentTextSharp size={20} />
                  <span className="font-semibold py-2 text-sm">
                    Administracion Proyección
                  </span>
                </Link>
              </div>
            </AccordionTab>
          </Accordion>
        )}
        {(auth?.idrol == 1 || auth?.idrol == 2) && (
          // ((auth?.nombrerol).toUpperCase() == 'DEVELOPER' || 'ADMINISTRADOR' ) && (

          <Link
            onClick={() => setVisible(false)}
            to={`${PRIVATE.CERTIFICADO}`}
            className="py-3 px-4 flex items-center gap-x-4 border-white hover:bg-slate-100 border-l-8 hover:border-rose-700"
          >
            <PiCertificateDuotone size={30}/>
            <span className="font-semibold">Certificado</span>
          </Link>
        )}
        {(auth?.idrol == 1 || auth?.idrol == 2) && (
          // ((auth?.nombrerol).toUpperCase() == 'DEVELOPER' || 'ADMINISTRADOR' ) && (

          <Accordion className="">
            <AccordionTab headerTemplate={templateLibros}>
              <div className="flex flex-col  justify-center">
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.LIBROS}/${PRIVATE.LIBRO_6}`}
                  className="flex items-center gap-x-4 hover:bg-slate-100 py-2 pl-10"
                >
                  <FiBook size={20} />
                  <span className="font-semibold py-2 text-sm">Libro 6</span>
                </Link>
                <Divider />
                <Link
                  onClick={() => setVisible(false)}
                  to={`${PRIVATE.LIBROS}/${PRIVATE.LIBRO_5}`}
                  className="flex items-center gap-x-4 hover:bg-slate-100 py-2 pl-10"
                >
                  <FiBook size={20} />
                  <span className="font-semibold py-2 text-sm">Libro 5</span>
                </Link>
              </div>
            </AccordionTab>
          </Accordion>
        )}
        {(auth?.idrol == 1 || auth?.idrol == 2) && (
          <Link
            onClick={() => setVisible(false)}
            to={`${PRIVATE.FECHAS_INGRESO_EGRESO}`}
            className="py-3 px-4 flex items-center gap-x-4 border-white hover:bg-slate-100 border-l-8 hover:border-rose-700"
          >
            <FaRegCalendarCheck size={25} />
            <span className="font-semibold ">Fechas Ingreso y Egreso</span>
          </Link>
        )}
      </div>
    </Sidebar>
  );
};
