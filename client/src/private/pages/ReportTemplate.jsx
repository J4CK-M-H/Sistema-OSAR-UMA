const ReportTemplate = ({
  nombre,
  participacionCertificado,
  fechaCursadaCertificado,
  fechaEmisionCertificado,
  escuelaOrganizadaCertificado,
  creditosCertificado,
  directoreEscuela,
  tallerCertificado,
}) => {
  return (
    <>
      <div className="flex relative p-0 pt-8" style={{}}>
        <img
          className="w-[220px] h-[695px] z-10"
          src="/franja.png"
          alt="franja"
          style={{
            marginLeft: "10px",
          }}
        />
        <div className="w-[500px] py-0 m-0 text-justify">
          <img
            src="/logo.png"
            className="h-[64px] mt-[27px] ml-[225px]"
            alt="logo"
          />
          <h2
            className="uppercase ml-[293px] mt-[57px] text-[35px] "
            style={{ fontFamily: "antqua_bold", letterSpacing: "" }}
          >
            Certificado
          </h2>
          <span
            className="inline-block w-[90px] mt-[4px] mb-1 text-[15px] ml-[378px]"
            style={{ fontFamily: "Antqua" }}
          >
            Otorgado a:
          </span>
          <p
            className="text-center italic uppercase w-[651px] ml-[90px] mb-[25px]"
            style={{ fontFamily: "antqua_italic", fontSize: "1.9rem" }}
          >
            {nombre}
          </p>
          <p
            className="w-[655px] ml-[90px] text-justify"
            style={{
              fontSize: "0.95rem",
              fontFamily: "Antqua",
              lineHeight: "25px",
            }}
          >
            Por su participación como{" "}
            <span className="uppercase" style={{ fontFamily: "antqua_bold" }}>
              {participacionCertificado}
            </span>
            , en el taller <span className="italic font-bold">"</span>
            <span className="uppercase" style={{ fontFamily: "antqua_bold" }}>
              {tallerCertificado}
              <span className="italic font-bold">"</span>
            </span>
            , llevado a cabo del {fechaCursadaCertificado}, organizado por la
            Escuela Profesional de Enfermería de la Universidad María
            Auxiliadora. Equivalente a {creditosCertificado} créditos
            académicos.
          </p>
          <p
            className="antquab text-[16px] w-[655px] ml-[90px] text-end  mx-auto mt-10"
            style={{ fontSize: "0.95rem", fontFamily: "Antqua" }}
          >
            Lima, {new Date().toLocaleDateString("es-PE",{  day: 'numeric',month: 'long', year: 'numeric' })}
          </p>
          <img
            src="/marca_agua.png"
            className="absolute"
            alt="marca_agua"
            style={{
              left: "470px",
              top: "269px",
              width: "7.41cm",
              height: "7.41cm",
            }}
          />
          <img
            className="w-[130px] h-[130px] absolute z-10"
            style={{ left: "455px", top: "550px" }}
            src="/sello.png"
            alt=""
          />
          <img src="/firma.png" alt="firma" className="w-[120px] absolute top-[545px] left-[590px]"/>
          <img src="/line.png" alt="firma" className="w-[250px] h-[3px] absolute top-[666px] left-[530px]" />
          <div className="text-center font-[Antqua] absolute top-[670px] left-[355px] w-[600px]">
            <p className="font-semibold">{ directoreEscuela }</p>
            <p>{ escuelaOrganizadaCertificado }</p>
            <p>Universidad María Auxiliadora</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportTemplate;
