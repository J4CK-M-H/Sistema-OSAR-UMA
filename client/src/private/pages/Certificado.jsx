import React, { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { jsPDF } from "jspdf";
import { PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import { PDF } from "./PDF";


export const Certificado = () => {
  const [srcState, setSrcState] = useState(null);
  const [estudiante, setEstudiante] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const generarPdf = async (estudiante) => {
    const exBytes = await fetch("/Plantilla.pdf").then((response) =>
      response.arrayBuffer()
    );

    const fontBytesCursive = await fetch("/fonts/02255_ANTQUAI.ttf").then(
      (res) => res.arrayBuffer()
    );
    const fontBytes = await fetch("/fonts/Book-Antiqua.ttf").then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const customFontCurisve = await pdfDoc.embedFont(fontBytesCursive);
    // console.log(customFont);

    // const textSize = 35;
    const pages = pdfDoc.getPages();
    const firstPg = pages[0];
    const secondPg = pages[1];

    firstPg.drawText(estudiante, {
      x: 300,
      y: 370,
      size: 24,
      font: customFontCurisve,
      // color: rgb(1, 1, 1),
    });

    let corte = Math.floor(descripcion.length / 4);
    console.log(descripcion.trim().length);
    let primera_fila = descripcion.slice(0, 80);

    let segunda_fila = descripcion.slice(77, 77 * 2);
    let tercera_fila = descripcion.slice(corte * 2 + 2, corte * 3 + 2);
    let cuarta_fila = descripcion.slice(230, 500);
    let texto_completo = `${primera_fila}\n${segunda_fila}\n${tercera_fila}\n${cuarta_fila}`;
    console.log(texto_completo);

    let textSize = 13.3;
    const textWidth = customFont.widthOfTextAtSize(primera_fila, textSize);

    firstPg.drawText(texto_completo, {
      x: 260,
      y: 330,
      width: 500,
      size: textSize,

      font: customFont,
      color: rgb(0, 0, 0),
    });

    // firstPg.drawText(segunda_fila, {
    //   x:260,
    //   y: 300,
    //   size: 13.3,
    //   font: customFont,
    //   color: rgb(0,0,0)
    // });

    // firstPg.drawText(tercera_fila, {
    //   x:260,
    //   y: 270,
    //   size: 13.3,
    //   font: customFont,
    //   color: rgb(0,0,0)
    // });

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    setSrcState(uri);
  };

  const generarJspdf = async () => {
    var img = new Image();
    img.src = "/jiji.jpg";
    var doc = new jsPDF("l", "mm", "a3"); // optional parameters
    const myFont = await fetch("/fonts/02255_ANTQUAI.ttf").then((res) =>
      res.arrayBuffer()
    );
    doc.addFileToVFS("/fonts/02255_ANTQUAI.ttf", myFont);
    doc.addFont("/fonts/02255_ANTQUAI.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    doc.setFont("", "bold");
    doc.text("Hello world!", 10, 10);
    doc.addImage(img, "JPEG", 100, 2);
    doc.save("new.pdf");
  };

  

  return (
    <div>
      <h2 className="text-2xl font-black">Certificado</h2>
      <div className="flex gap-x-4">
        <button
          onClick={() => setSrcState(null)}
          className="py-2 px-4 text-white bg-yellow-600 rounded-sm"
        >
          Resetear
        </button>
        <button
          onClick={() => generarPdf(estudiante)}
          className="py-2 px-4 text-white bg-green-600 rounded-sm"
        >
          Generar certificado
        </button>

        <div>
          <PDFDownloadLink document={<PDF nombre={estudiante.toLocaleUpperCase()} />} fileName="pdfprueba.pdf">
            {({ loading, url, error, blolb }) =>
              loading ? <button>Loading...</button> : <button>is loaded</button>
            }
          </PDFDownloadLink>
        </div>
      </div>

      <input
        type="text"
        value={estudiante}
        onChange={(event) => setEstudiante(event.target.value)}
        className="block py-2 px-4 my-4 w-[300px] outline-none border border-slate-200"
      />

      <textarea
        className="text-justify font-bold"
        cols="60"
        rows="5"
        value={descripcion}
        onChange={(event) => setDescripcion(event.target.value)}
      ></textarea>

      <iframe
        src={srcState}
        frameBorder="0"
        className="w-full h-[600px]"
      ></iframe>
    </div>
  );
};
