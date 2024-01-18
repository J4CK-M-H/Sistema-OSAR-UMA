import { GraficoEstadisticasTotales } from "../components/GraficoEstadisticasTotales";

const Home = () => {

  // PARAMETROS PAGE REPORTE ALUMNOS
  localStorage.getItem('parametros') ?? localStorage.setItem(
    "parametros",
    JSON.stringify({ periodo: 20232, radioOption: "M" })
  );
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Estadisticas Totales</h2>
      <GraficoEstadisticasTotales />
    </div>
  );
};

export default Home;
