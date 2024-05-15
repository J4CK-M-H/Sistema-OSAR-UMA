import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import ReportTemplate from "./ReportTemplate";
import { BackTemplate } from "./BackTemplate";
// import ReportTemplate from "./ReportTemplate";

export const Certificado = () => {
  const reportTemplateRef = useRef(null);
  const backTemplateRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [numeroFolio, setNumeroFolio] = useState("");
  const [directoreEscuela, setDirectoreEscuela] = useState("");
  const [numeroLibro, setNumeroLibro] = useState("");
  const [participacionCertificado, setParticipacionCertificado] = useState("");
  const [tallerCertificado, setTallerCertificado] = useState("");
  const [fechaCursadaCertificado, setFechaCursadaCertificado] = useState("");
  const [fechaEmisionCertificado, setFechaEmisionCertificado] = useState("");
  const [creditosCertificado, setCreditosCertificado] = useState("");
  const [escuelaOrganizadaCertificado, setEscuelaOrganizadaCertificado] =
    useState("");

  const componentRef = useRef();
  const componenBacktRef = useRef();

  const [showPrints, setShowPrints] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleBackPrint = useReactToPrint({
    content: () => componenBacktRef.current,
  });

  const handleGeneratePdf = async () => {
    const doc = new jsPDF({
      format: "a4",
      // format: "letter",
      unit: "px",
      orientation: "landscape",
    });
    doc.addFileToVFS("/fonts/Book-Antiqua.ttf", "/fonts/Book-Antiqua.bin");
    doc.addFont("Book-Antiqua.ttf", "antiqua", "normal");

    doc.setFont("antiqua", "normal");
    console.log(doc.getFontList());
    // Adding the fonts.
    doc.setFontSize(50);
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };

  console.log()

  return (
    <div>
      <div className="py-2 flex gap-x-4 flex-wrap">
        <div>
          <label htmlFor="" className="block">
            Otorgado a:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Participación:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={participacionCertificado}
            onChange={(event) =>
              setParticipacionCertificado(event.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Taller:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={tallerCertificado}
            onChange={(event) => setTallerCertificado(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Fecha cursada:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={fechaCursadaCertificado}
            onChange={(event) => setFechaCursadaCertificado(event.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="" className="block">
            Fecha emisión:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={fechaEmisionCertificado}
            onChange={(event) => setFechaEmisionCertificado(event.target.value)}
          />
        </div> */}
        <div>
          <label htmlFor="" className="block">
            Numero Libro:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={numeroLibro}
            onChange={(event) => setNumeroLibro(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Numero Folio:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={numeroFolio}
            onChange={(event) => setNumeroFolio(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Director@ de escuela:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={directoreEscuela}
            onChange={(event) => setDirectoreEscuela(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Escuela Organizadora:
          </label>
          <input
            type="text"
            className="border border-slate-400 py-2 px-3 rounded-sm w-[300px] outline-none"
            value={escuelaOrganizadaCertificado}
            onChange={(event) => setEscuelaOrganizadaCertificado(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowPrints(!showPrints)}
          className="bg-blue-600 text-white py-2 px-4 rounded-sm"
        >
          {showPrints ? "Ocultar Componentes" : "Habilitar Componente"}
        </button>
        <button
          onClick={handlePrint}
          className="bg-red-600 text-white py-2 px-4 rounded-sm"
        >
          Imprimir el componente
        </button>
      </div>

      <div ref={componentRef}>
        {showPrints && (
          <>
            <ReportTemplate
              nombre={nombre}
              participacionCertificado={participacionCertificado}
              fechaCursadaCertificado={fechaCursadaCertificado}
              fechaEmisionCertificado={fechaEmisionCertificado}
              escuelaOrganizadaCertificado={escuelaOrganizadaCertificado}
              creditosCertificado={creditosCertificado}
              tallerCertificado={tallerCertificado}
              directoreEscuela={directoreEscuela}
            />
            <BackTemplate numeroLibro={numeroLibro} numeroFolio={numeroFolio}/>
          </>
        )}
      </div>

      {/* <div ref={componenBacktRef}></div> */}
      {/* <button onClick={handleBackPrint} className="bg-red-600 text-white py-2 px-4 rounded-sm">Imprimir parte trasera</button> */}

      {/* <button
        className="bg-red-600 text-white py-2 px-4 rounded-sm"
        onClick={handleGeneratePdf}
      >
        Generate PDF
      </button> */}
    </div>
  );
};
