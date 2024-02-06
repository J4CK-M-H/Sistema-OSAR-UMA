import { InputText } from "primereact/inputtext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbPassword, TbLogin2 } from "react-icons/tb";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useApi } from "../hooks/useAxios";
// LOGO
import logo from "../assets/images/UmaLogoC.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  let { setAuth, setAuthLoading } = useContext(AuthContext);

  let navigate = useNavigate();

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const handleFormLogin = async (event) => {
    event.preventDefault();

    if ([username.trim(), password.trim()].some((field) => field === "")) {
      let message = "Ingrese todo los campos";
      showError(message);
      return;
    }

    let user = {
      username,
      password,
    };

    try {
      const { data } = await useApi.post("/auth/login", user);
      localStorage.setItem("user", JSON.stringify(data));
      setAuth(data);
      // navigate('/private/home')
      console.log(data)
    } catch (error) {
      // console.log(error);
      if (error.response.data) {
        showError(error.response.data?.message);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#F5F5F5]">
      <Card className="shadow-xl">
        <img className="mx-auto" src={logo} alt="logo_uma" />
        <form onSubmit={handleFormLogin} className="sm:w-[450px] space-y-4 p-4">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <FiUser size={20} color="white" />
            </span>
            <InputText
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon bg-rose-700">
              <TbPassword size={20} color="white" />
            </span>
            <InputText
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="bg-rose-700 w-full py-2 rounded-sm text-white font-medium cursor-pointer flex items-center justify-center gap-3">
            Ingresar
            <TbLogin2 size={25} />
          </button>
          <Toast ref={toast} />
        </form>
      </Card>
    </div>
  );
};

export default Login;
