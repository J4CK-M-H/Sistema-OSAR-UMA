import { Outlet } from "react-router-dom"

export const Libro = () => {
  return (
    <div>
      {/* <h2 className="text-3xl font-medium">Registro de Libros</h2> */}
      <Outlet />
    </div>
  )
}
