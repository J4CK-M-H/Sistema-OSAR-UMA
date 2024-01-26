import ApexChart from "react-apexcharts";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useAxios";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FaSearchengin } from "react-icons/fa6";

export const GraficoEstadisticasTotales = ({ periodos, matriculados, egresados, desertores, loadingGraficos }) => {
  const toast = useRef(null);

  const [loadingMatriculados, setLoadingMatriculados] = useState(true);

  // const [periodos, setPeriodos] = useState([]);

  const series = [
    { name: "Matriculados", data: [...matriculados] },
    { name: "Egresados", data: [...egresados] },
    { name: "Desertores", data: [...desertores] },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 800,
      toolbar: { show: false },
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

  if (loadingGraficos) return;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-md font-extrabold text-black text-center">
          Estudiantes matriculados
        </h2>
        {/* <small>Cantidades totales</small> */}

        <div className="w-full">
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
