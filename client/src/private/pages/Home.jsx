import { useEffect, useRef, useState } from "react";
import { GraficoEstadisticasTotales } from "../components/GraficoEstadisticasTotales";
import { GraficoNuevosConvalidados } from "../components/GraficoNuevosConvalidados";
import { GraficoRecuperoDesercion } from "../components/GraficoRecuperoDesercion";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FaSearchengin } from "react-icons/fa6";
import { useApi } from "../../hooks/useAxios";

const carreras = [
  { name: "TODAS LAS CARRERAS", code: null },
  { name: "ADMINISTRACION DE NEGOCIOS INTERNACIONALES", code: "E1" },
  { name: "ADMINISTRACION Y MARKETING", code: "E2" },
  { name: "CONTABILIDAD Y FINANZAS", code: "E3" },
  { name: "ADMINISTRACION Y NEGOCIOS INTERNACIONALES", code: "E4" },
  { name: "INGENIERÍA INDUSTRIAL", code: "E5" },
  {
    name: "DIPLOMADO INTERNACIONAL DE ESPECILIZACIÓN TOXICOLOGÍCA AMBIENTAL Y SEGURIDAD",
    code: "DT",
  },
  { name: "MAESTRIA EN SALUDAD PÚBLICA", code: "MS" },
  {
    name: "SEG. ESP. PROF. EN ENFERMERÍA EN CUIDADO INTEGRAL INFANTIL CON MENCIÓN EN CRECIMIENTO Y DESARROLLO",
    code: "EC",
  },
  { name: "SEG. ESP. PROF. EN EMERGENCIAS Y DESASTRES", code: "ED" },
  {
    name: "SEG. ESP. PROF. EN ENFERMERÍA EN CUIDADOS INTENSIVOS",
    code: "EI",
  },
  { name: "SEG. ESP. PROF. EN ENFERMERÍA EN CENTRO QUIRÚRGICO", code: "EQ" },
  {
    name: "SEG. ESP. PROF. EN ENFERMERÍA EN SALUD FAMILIAR Y COMUNITARIA",
    code: "ES",
  },
  { name: "ENFERMERIA", code: "S1" },
  { name: "FARMACIA QUIMICA", code: "S2" },
  { name: "NUTRICION Y DIETÉTICA", code: "S3" },
  { name: "PSICOLOGIA", code: "S4" },
  {
    name: "TECNOLOGÍA MÉDICA EN TERAPIA FÍSICA Y REHABILITACIÓN",
    code: "S5",
  },
  {
    name: "TECNOLOGÍA MÉDICA EN LABORATORIO CLÍNICO Y ANATOMÍA PATOLÓGICA",
    code: "S6",
  },
];

const Home = () => {
  const [loadingGraficos, setLoadingPeriodos] = useState(true);

  const [periodos, setPeriodos] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [estudiantesMatriculados, setEstudiantesMatriculados] = useState([]);

  const [matriculados, setMatriculados] = useState([]);
  const [desertores, setDesertores] = useState([]);
  const [egresados, setEgresados] = useState([]);

  const [nuevos, setNuevos] = useState([]);
  const [convalidantes, setConvalidantes] = useState([]);

  const [recuperos, setRecuperos] = useState([]);
  const [deserciones, setDeserciones] = useState([]);
  const [crecimientos, setCrecimientos] = useState([]);

  const [nuevosConvalidantes, setNuevosConvalidantes] = useState([]);
  const [recuperoDesercion, setRecuperoDesercion] = useState([]);

  const toast = useRef(null);

  useEffect(() => {
    const graficos = async () => {
      try {
        let { data } = await useApi.post("/graficos/graficos_con_filtro");
        setEstudiantesMatriculados(data.estudiantes_matriculados);
        setNuevosConvalidantes(data.nuevos_convalidantes);
        setRecuperoDesercion(data.recuperos_desercion);

        let periodoArray = data.estudiantes_matriculados.map((item) => {
          return item.periodo;
        });
        console.log(data);
        setPeriodos(periodoArray);

        // ESTUDIANTES MATRICULADOS DATA
        let desertoresArray = data.estudiantes_matriculados.map((item) => {
          return `-${item.desertores}`;
        });

        let matriculadosArray = data.estudiantes_matriculados.map((item) => {
          return item.matriculados;
        });

        let egresadosArray = data.estudiantes_matriculados.map((item) => {
          return item.egresados;
        });

        setMatriculados(matriculadosArray);
        setEgresados(egresadosArray);
        setDesertores(desertoresArray);

        // NUEVOS Y CONVALIDANTES
        let array_nuevos = data.nuevos_convalidantes.map(
          (item) => item.cachimbos
        );
        let array_convalidados = data.nuevos_convalidantes.map(
          (item) => item.convalidantes
        );
        setNuevos(array_nuevos);
        setConvalidantes(array_convalidados);

        // RECUPERACIONES Y DESECIONES
        let array_recuperos = data.recuperos_desercion.map(
          (item) => item.recuperos_t
        );
        let array_deserciones = data.recuperos_desercion.map(
          (item) => item.desercion_t
        );
        let array_crecimientos = data.recuperos_desercion.map(
          (item) => item.crecimiento
        );

        setRecuperos(array_recuperos);
        setDeserciones(array_deserciones);
        setCrecimientos(array_crecimientos);

        console.log(estudiantesMatriculados);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPeriodos(false);
      }
    };
    graficos();
  }, []);

  const handleSearch = async () => {
    try {
      let { data } = await useApi.post("/graficos/graficos_con_filtro", {
        cod_esp: selectedCarrera.code,
      });
      setEstudiantesMatriculados(data.estudiantes_matriculados);
      setNuevosConvalidantes(data.nuevos_convalidantes);
      setRecuperoDesercion(data.recuperos_desercion);

      let periodoArray = data.estudiantes_matriculados.map((item) => {
        return item.periodo;
      });

      setPeriodos(periodoArray);

      // ESTUDIANTES MATRICULADOS DATA
      let desertoresArray = data.estudiantes_matriculados.map((item) => {
        return `-${item.desertores}`;
      });

      let matriculadosArray = data.estudiantes_matriculados.map((item) => {
        return item.matriculados;
      });

      let egresadosArray = data.estudiantes_matriculados.map((item) => {
        return item.egresados;
      });

      setMatriculados(matriculadosArray);
      setEgresados(egresadosArray);
      setDesertores(desertoresArray);

      // NUEVOS Y CONVALIDANTES
      let array_nuevos = data.nuevos_convalidantes.map(
        (item) => item.cachimbos
      );
      let array_convalidados = data.nuevos_convalidantes.map(
        (item) => item.convalidantes
      );
      setNuevos(array_nuevos);
      setConvalidantes(array_convalidados);

      // RECUPERACIONES Y DESECIONES
      let array_recuperos = data.recuperos_desercion.map(
        (item) => item.recuperos_t
      );
      let array_deserciones = data.recuperos_desercion.map(
        (item) => item.desercion_t
      );
      let array_crecimientos = data.recuperos_desercion.map(
        (item) => item.crecimiento
      );

      setRecuperos(array_recuperos);
      setDeserciones(array_deserciones);
      setCrecimientos(array_crecimientos);
    } catch (error) {
      console.log(error);
    }
  };

  // PARAMETROS PAGE REPORTE ALUMNOS
  localStorage.getItem("parametros") ??
    localStorage.setItem(
      "parametros",
      JSON.stringify({ periodo: 20232, radioOption: "M" })
    );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Estadisticas Totales</h2>
      <div className="flex mx-auto gap-x-4 w-[75%]">
        <Dropdown
          value={selectedCarrera}
          onChange={(e) => setSelectedCarrera(e.value)}
          options={carreras}
          optionLabel="name"
          placeholder="Selecciona una carrera"
          emptyFilterMessage="No hay resultados"
          className="flex-1 overflow-auto"
          filter
          width={100}
        />
        <Toast ref={toast} />
        <button
          onClick={handleSearch}
          className="w-[200px]  bg-[#FF004D] text-white flex items-center justify-center rounded-sm gap-x-2"
        >
          {" "}
          <FaSearchengin /> Buscar
        </button>
      </div>
      <GraficoEstadisticasTotales
        periodos={periodos}
        matriculados={matriculados}
        egresados={egresados}
        desertores={desertores}
        loadingGraficos={loadingGraficos}
      />
      <div className="flex gap-x-6 flex-col md:flex-row">
        <GraficoNuevosConvalidados
          periodos={periodos}
          nuevos={nuevos}
          convalidantes={convalidantes}
        />
        <GraficoRecuperoDesercion
          periodos={periodos}
          recuperos={recuperos}
          crecimientos={crecimientos}
          deserciones={deserciones}
        />
      </div>
    </div>
  );
};

export default Home;
