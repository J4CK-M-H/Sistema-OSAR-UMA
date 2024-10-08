import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import AuthContext from "../../context/AuthContext";
import { BiSolidDoorOpen } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";

export const Navbar = ({ setVisible }) => {
  const { closeSession } = useContext(AuthContext);

  return (
    <div className="h-20 bg-rose-700 flex items-center justify-between px-8 fixed w-full z-20">
      <button
        className="w-[40px] text-rose-700 h-[40px] flex justify-center items-center bg-white rounded-md"
        onClick={() => setVisible(true)}
      >
        <CgMenuGridO size={30} />
      </button>
      <div className="flex">
        <p className="text-white sombra sombra_animacion_1 text-4xl font-extrabold">U</p>
        <p className="text-white sombra sombra_animacion_2 text-4xl font-extrabold">M</p>
        <p className="text-white sombra sombra_animacion_3 text-4xl font-extrabold">A</p>
      </div>
      <button
        className="text-white flex flex-col items-center"
        onClick={closeSession}
        title="Logout"
      >
        <BiSolidDoorOpen size={30} />
        Logout
      </button>
    </div>
  );
};
