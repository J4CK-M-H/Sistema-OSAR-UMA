import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { PRIVATE, PUBLIC } from '../rutas/routes';
import AuthContext from '../context/AuthContext';

export const RequireAuth = ({ roles }) => {

  let { auth, loadingAuth } = useContext(AuthContext);
  
  let token = JSON.parse(localStorage.getItem("user"))
  console.log(token)


  return (
    roles.includes( (auth?.idrol) )
    ? <Outlet />
    : auth?.idrol
      ? <Navigate to={`${PRIVATE.UNAUTHORIZED}`}  replace />
      : <Navigate to={PUBLIC.LOGIN} replace/>
  )
}
