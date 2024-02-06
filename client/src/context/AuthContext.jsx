import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useAxios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loadingAuth, setloadingAuth] = useState(true);
  const [auth, setAuth] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    console.log('auth context')
    Authenticate();
  }, []);

  const Authenticate = async () => {
    setloadingAuth(true);
    const token = JSON.parse(localStorage.getItem("user"));
    console.log(auth)
    if (!token) {
      setloadingAuth(false);
      return;
    }

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };

    try {
      const { data } = await useApi("/auth/session", config);
      setAuth(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingAuth(false);
    }
  };

  const closeSession = () => {
    setAuth();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loadingAuth, setloadingAuth, closeSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
