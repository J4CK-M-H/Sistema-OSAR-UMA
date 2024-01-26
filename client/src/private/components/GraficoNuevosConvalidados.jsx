import { Card } from "primereact/card";
import ApexChart from "react-apexcharts";
import React from "react";

export const GraficoNuevosConvalidados = ({
  periodos,
  nuevos,
  convalidantes,
}) => {

  const series = [
    {
      name: "Nuevos",
      data: nuevos,
    },
    {
      name: "Convalidantes",
      data: convalidantes,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: periodos,
      labels: {
        style: {
          // colors: ["#ccc"],
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "700",
          // cssClass: "apexcharts-xaxis-label",
        },
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [],
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "700",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: false,
      offsetY: 15,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 600,
      itemMargin: {
        horizontal: 5,
        vertical: 10,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Card className="flex-1">
      <h2 className="text-md font-extrabold text-black text-center">
        Nuevos Estudiantes Convalidados
      </h2>
      <div className="w-full">
        <ApexChart type="bar" height={350} options={options} series={series} />
      </div>
    </Card>
  );
};
