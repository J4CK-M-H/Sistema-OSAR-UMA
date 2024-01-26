import { Card } from "primereact/card";
import ApexChart from "react-apexcharts";
import React, { useEffect, useState } from "react";

export const GraficoRecuperoDesercion = ({ periodos, recuperos, crecimientos, deserciones }) => {

  const series = [
    {
      name: "desercion",
      data: deserciones,
    },
    {
      name: "Crecimiento",
      data: crecimientos,
    },
    {
      name: "Repecuros",
      data: recuperos,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
      },
    },
    colors: ["#FE0000", "#65B741", "#EE7214"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: [4, 4, 4],
      curve: "smooth",
      dashArray: [3, 3, 3],
    },
    grid: {
      borderColor: "#ccc",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0,
      },
    },
    markers: {
      // size: 0,
      hover: {
        // sizeOffset: 6
      }
    },
    xaxis: {
      categories: [...periodos],
      // },
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
      axisBorder: {
        show: true,
        color: "#000",
        height: 0.5,
        offsetX: 0,
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
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 600,
      itemMargin: {
        horizontal: 5,
        vertical: 10,
      },
    },
  };

  return (
    <Card className="flex-1">
      <h2 className="text-md font-extrabold text-black text-center">
        GraficoRecuperoDesercion
      </h2>
      <div className="w-full">
        <ApexChart type="line" height={350} options={options} series={series} />
      </div>
    </Card>
  );
};
