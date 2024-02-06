import { PRIVATE, PUBLIC } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { Graficos } from "../private/pages/Graficos";
import Unauthorized from "../private/components/Unauthorized";
import { LayoutPrivate } from "../private/layout/LayoutPrivate";
import { Usuarios } from "../private/pages/Usuarios";
import { RequireAuth } from "../guard/RequireAuth";
import { ReportesUma } from "../private/pages/ReportesUma";
import { ReportesUmaAlumnos } from "../private/components/ReportesUmaAlumnos";
import { ReportesSuneduMinedu } from "../private/components/ReportesSuneduMinedu";
import { Admision } from "../private/pages/Admision";
import { ChekingAdmision } from "../private/components/ChekingAdmision";
import { ListaAdmision } from "../private/components/ListaAdmision";
import { NotFound } from "../publico/NotFound";
import { ReporteAdmision } from "../private/components/ReporteAdmision";
import { AdministracionProyeccion } from "../private/components/AdministracionProyeccion";
import { Certificado } from "../private/pages/Certificado";
import { Libro } from "../private/pages/Libro";
import { Libro6 } from "../private/components/Libro6";
import { Libro5 } from "../private/components/Libro5";
import { Correo } from "../private/pages/Correo";
// import Graficos from "../private/pages/Graficos";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutPrivate />}>
        <Route path="/" element={<Navigate to={PRIVATE.USUARIOS} />} />

    
        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.USUARIOS}`} element={<Usuarios />} />
        </Route>

        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.HOME}`} element={<Graficos />} />
        </Route>

        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.REPORTES_UMA}`} element={<ReportesUma />}>
            <Route
              path={`${PRIVATE.REPORTE_ALUMNOS}`}
              element={<ReportesUmaAlumnos />}
            />
            <Route
              path={`${PRIVATE.REPORTE_SUNEDU_MINEDU}`}
              element={<ReportesSuneduMinedu />}
            />
          </Route>
        </Route>

        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.ADMISION}`} element={<Admision />}>
            <Route
              path={`${PRIVATE.ADMISION_CHEKING_LIST}`}
              element={<ChekingAdmision />}
            />
            <Route
              path={`${PRIVATE.ADMISION_LISTA_ADMISION}`}
              element={<ListaAdmision />}
            />
            <Route
              path={`${PRIVATE.ADMISION_REPORTE_ADMISION}`}
              element={<ReporteAdmision />}
            />
            <Route
              path={`${PRIVATE.ADMISION_ADMINISTRACION_PROYECCION_ADMISION}`}
              element={<AdministracionProyeccion />}
            />
          </Route>
        </Route>

        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.CERTIFICADO}`} element={<Certificado />} />
        </Route>

        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.CORREO}`} element={<Correo />} />
        </Route>

        <Route element={<RequireAuth roles={[1, 2]} />}>
          <Route path={`${PRIVATE.LIBROS}`} element={<Libro />}>
            <Route path={`${PRIVATE.LIBRO_6}`} element={<Libro6 />} />
            <Route path={`${PRIVATE.LIBRO_5}`} element={<Libro5 />} />
          </Route>
        </Route>
      </Route>

      <Route path={PRIVATE.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={PUBLIC.NOT_FOUND} element={<NotFound />} />
      <Route path="*" element={<Navigate replace to={PUBLIC.NOT_FOUND} />} />
    </Routes>
    // </DoctorProvider>
  );
};
