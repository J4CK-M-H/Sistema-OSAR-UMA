import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { SiMicrosoftoutlook } from "react-icons/si";

export const Correo = () => {
  const archivo = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [valorBase, setValorBase] = useState(null);

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_fv55ren",
  //       "template_wkdeeo8",
  //       form.current,
  //       "eKzuzZveTfv5GJe2I"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  const base64 = () => {
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(archivo.current.files[0]);
    reader.onload = function () {
      return document = reader.result;
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    console.log(reader.result)
    console.log(reader.readyState)
    // setValorBase(reader.readyState)
    return reader;
  };

  return (
    <section>
      <div>
        <label htmlFor="mensaje">Mensaje</label>
        <input
          type="text"
          id="mensaje"
          className="d-block w-full py-2 px-4 border border-slate-300"
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mensaje">Cuerpo</label>
        <textarea
          type="text"
          id="mensaje"
          className="d-block w-full py-2 px-4 border border-slate-300 outline-none h-[150px] resize-none"
          value={cuerpo}
          onChange={(event) => setCuerpo(event.target.value)}
        />
      </div>
      
      <a
        href={`mailto:sergio.gavidia@uma.edu.pe;jack.meza@uma.edu.pe?subject=${mensaje}&body=${cuerpo}`}
        className="py-2 px-4 rounded-sm bg-rose-700 text-white text-center flex w-[200px] gap-x-4 items-center"
      >
        <SiMicrosoftoutlook size={30} />
        Enviar correos
      </a>
      {/* <a
        href={`mailto:sergio.gavidia@uma.edu.pe?subject=This%20is%20the%20subject&cc=algodetexto&bcc=someone_else@example.com&body=<img src="/jiji.png" alt="Approve" width="106">`}
        className="py-2 px-4 rounded-sm bg-rose-700 text-white text-center flex w-[200px] gap-x-4 items-center"
      >
        <SiMicrosoftoutlook size={30} />
        Enviar correos
      </a> */}
      {/* </div> */}
      {/* <iframe src="https://www.shecodes.io/athena/11997-how-to-use-mailto-html-code-to-open-email-client" width="560" height="315"></iframe> */}
    </section>
    // <a href="mailto:`{email}`?subject={subject}&body={body}">Click to Send an Email</a>
  );
};
