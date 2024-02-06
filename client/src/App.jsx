import { Navigate, Route, Routes } from "react-router-dom";
import { PRIVATE, PUBLIC } from "./rutas/routes";
import Login from "./publico/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { GuardRoutes } from "./guard/GuardRoutes";
import { PrivateRoutes } from "./rutas/PrivateRoutes";
import { NotFound } from "./publico/NotFound";

function App() {
  const { auth, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) return;

  return (
      <Routes>
        {/* RUTAS PRIVADAS */}
        <Route path="/" element={<Navigate to={`${PRIVATE.PRIVATE}`} />} />
        <Route element={<GuardRoutes />}>
          <Route path={`${PRIVATE.PRIVATE}/*`} element={<PrivateRoutes />} />
        </Route>

        {/* RUTAS PUBLICAS */}
        <Route
          path={PUBLIC.LOGIN}
          element={
            auth?.usuario ? <Navigate to={`/${PRIVATE.PRIVATE}`} /> : <Login />
          }
        />
        <Route path={PUBLIC.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate replace to={PUBLIC.NOT_FOUND} />} />
      </Routes>
  );
}

export default App;
