import React, { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
// import moduleName from '';

export const Certificado = () => {
  const [srcState, setSrcState] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const generarPdf = async (nombre) => {
    const exBytes = await fetch("/Plantilla.pdf").then((response) =>
      response.arrayBuffer()
    );

    const fontBytes = await fetch("/fonts/02255_ANTQUAI.ttf").then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    // console.log(customFont);

    // const textSize = 35;
    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    firstPg.drawText(nombre, {
      x: 260,
      y: 370,
      size: 24,
      font: customFont,
      // color: rgb(1, 1, 1),
    });

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    setSrcState(uri);
  };

  return (
    <div>
      <h2>Certifcaido</h2>
      <button onClick={() => setSrcState(null)}>Resetear</button>
      <button onClick={() => generarPdf(nombre)}>Generar certificado</button>

      <input type="text" value={nombre} onChange={ (event) => setNombre(event.target.value) } />

      <iframe
        src={srcState}
        frameBorder="0"
        className="w-full h-[500px]"
      ></iframe>
    </div>
  );
};
