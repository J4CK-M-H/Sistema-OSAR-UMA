import ApexChart from "react-apexcharts";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FaSearchengin } from "react-icons/fa6";

export const GraficoEstadisticasTotales = () => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const toast = useRef(null);

  const [matriculados, setMatriculados] = useState([]);
  const [desertores, setDesertores] = useState([]);
  const [egresados, setEgresados] = useState([]);

  const [loadingMatriculados, setLoadingMatriculados] = useState(true);

  const [periodos, setPeriodos] = useState([]);

  useEffect(() => {
    const get_matriculados = async () => {
      setLoadingMatriculados(true);
      try {
        let { data } = await useApi.post("/graficos/get_matriculados");

        let desertoresArray = data.map((item) => {
          return `-${item.desertores}`;
        });

        let matriculadosArray = data.map((item) => {
          return item.matriculados;
        });

        let egresadosArray = data.map((item) => {
          return item.egresados;
        });

        setMatriculados(matriculadosArray);
        setDesertores(desertoresArray);
        setEgresados(egresadosArray);
        //PARA EVITAR ACUMULADOS
        let periodoArray = data.map((item) => {
          return item.periodo;
        });
        setPeriodos(periodoArray);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMatriculados(false);
      }
    };

    get_matriculados();
  }, []);

  const handleSearch = async () => {
    if (selectedCarrera == null) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Debe seleccionar una carrera",
        life: 3000,
      });
      return;
    }

    setLoadingMatriculados(true);

    try {
      let { data } = await useApi.post("/graficos/get_matriculados", {
        cod_esp: selectedCarrera.code,
      });
      console.log(data);
      let desertoresArray = data.map((item) => {
        return `-${item.desertores}`;
      });

      let matriculadosArray = data.map((item) => {
        return item.matriculados;
      });

      let egresadosArray = data.map((item) => {
        return item.egresados;
      });

      setMatriculados(matriculadosArray);
      setDesertores(desertoresArray);
      setEgresados(egresadosArray);

      let periodoArray = data.map((item) => {
        return item.periodo;
      });

      setPeriodos(periodoArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMatriculados(false);
    }
  };

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

  const series = [
    { name: "Matriculados", data: [...matriculados] },
    { name: "Egresados", data: [...egresados] },
    { name: "Desertores", data: [...desertores] },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 800,
      toolbar: { show: true },
      borderType: "solid",
    },
    // theme: {
    //   mode: "dark",
    // },
    noData: {
      text: 'No hay registros de la carrera',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#000',
        fontSize: '20px',
        fontFamily: undefined,
        fontWeight: 800
      }
    },
    legend: {
      // show: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 600,
      itemMargin: {
        horizontal: 10,
        vertical: 20,
      },
    },
    grid: {
      borderColor: "#90A4AE",
      strokeDashArray: 0.4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        // colors: ['#000'],
        // opacity: .1
      },
      column: {
        // colors: ['red'],
        // opacity: .1
      },
    },

    xaxis: {
      type: "category",
      categories: [...periodos],
      labels: {
        style: {
          colors: [],
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "800",
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [],
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "800",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        endingShape: "rounded",
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#3081D0", "#EE7214", "#31304D"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
        return val;
      },
      foreColor: "red",
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#000"],
      },
      background: {
        enabled: true,
        // foreColor: "red",
        padding: 2,
        borderRadius: 1,
        borderWidth: 2,
        // borderColor: '#000',
        opacity: 1,
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  };

  if (loadingMatriculados) return;

  return (
    <div className="space-y-4">
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

      <Card className="shadow-lg">
        <h2 className="text-md font-extrabold text-black text-center">
          Estudiantes matriculados
        </h2>
        {/* <small>Cantidades totales</small> */}

        <div className="w-full">
          {/* <GraficoEstadisticasTotales /> */}
          <ApexChart
            type="bar"
            height={350}
            options={options}
            series={series}
          />
        </div>
      </Card>
    </div>
  );
};
