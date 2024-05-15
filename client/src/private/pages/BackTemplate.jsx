import React from "react";

export const BackTemplate = ({ numeroLibro, numeroFolio }) => {
  return (
    <div
      className="relative"
      style={{
        paddingTop: "250px",
      }}
    >
      <div
        style={{
          // marginTop: "500px",
          marginLeft: "265px",
          // padding: "0 2.1px",
          paddingRight: "40px",
          fontFamily: "Antqua",
          width: "360px",
          textAlign: "left",
          lineHeight: "30px",
          fontSize: ".9rem",
          // border: "1px solid black",
          // letterSpacing: ".1px"
        }}
      >
        <p>ESTA CARA SE ENCUENTRA VACÍA.</p>
        <p>CERTIFICADO Y ARCHIVADO EN</p>
        <p>
          EL LIBRO {numeroLibro} FOLIO <b className="ml-1">{numeroFolio}</b>
        </p>
        <p className="uppercase">
          AL DÍA {new Date().toLocaleDateString("es-PE", { day: "numeric" })}{" "}
          DEL MES DE {new Date().toLocaleDateString("es-PE", { month: "long" })}{" "}
          DE {new Date().toLocaleDateString("es-PE", { year: "numeric" })}.
        </p>
        <img
          src="/sello_osar.png"
          className="w-[100px] h-[100px] absolute right-[342px] top-[493px]"
          alt="sello_osar"
        />
        <img
          src="/firma_marco.png"
          className="w-[250px] absolute right-[105px] top-[490px]"
          alt="fimar_osar"
        />
        <img
          src="/line.png"
          className="w-[260px] absolute right-[102px] top-[594px] font-light"
          style={{
            height: '2px'
            // fontSize: '.5rem',
            // fontWeight: "lighter"
          }}
          alt="line_back"
        />
        <div className="top-[602px] right-[25px] w-[400px] text-center absolute" style={{fontSize: "16.5px",lineHeight: "19px", fontFamily: "antquab"}}>
          <p className="font-black">Marco Antonio Mendoza Chuchon</p>
          <p className="font-[Antqua]">Jefe de la Oficina de Servicios</p>
          <p >Académicos y Registros</p>
        </div>
      </div>
    </div>
  );
};
