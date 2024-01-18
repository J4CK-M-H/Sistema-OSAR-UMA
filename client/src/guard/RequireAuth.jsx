import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { PRIVATE, PUBLIC } from '../rutas/routes';
import AuthContext from '../context/AuthContext';

export const RequireAuth = ({ roles }) => {

  let { auth } = useContext(AuthContext);
  
  let token = JSON.parse(localStorage.getItem("usuario") ?? localStorage.setItem("usuario", "{}"));
  
  return (
    roles.includes( (auth?.idusuario) )
    ? <Outlet />
    : auth?.usuario
      ? <Navigate to={`${PRIVATE.UNAUTHORIZED}`}  replace />
      : <Navigate to={PUBLIC.LOGIN} replace/>
  )
}
