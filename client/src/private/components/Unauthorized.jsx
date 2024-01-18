import { useNavigate } from "react-router-dom";
import wizzard from "../../assets/images/mago.png";

const Unauthorized = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <div className="bg-blue-100 h-screen flex justify-center items-center gap-x-4">
      <img src={wizzard} className="w-[300px] " style={{ filter: "drop-shadow(1px 1px 8px #3c3c3c)"  }} alt="wizzar-image" />
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-5xl font-bold uppercase">No puedes pasar</h2>
        <p className="text-8xl font-extrabold text-blue-800">403</p>
        <span className="font-medium">
          Lo sentimos, no tienes lo permisos necesarios para pasar!
        </span>
        <button
          onClick={back}
          className="bg-blue-800 text-white py-2 px-6 rounded-sm"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
