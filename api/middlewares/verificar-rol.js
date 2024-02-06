import { response } from "express";

const tieneRol = (...roles) => {
  return (req, res = response, next) => {

    if( !req.usuario?.idrol ) {
      return res.status(500).json({message: 'Se quiere verificar el rol sin validar el token'})
    }

    if( !roles.includes((req.usuario?.idrol)) ) {
      return res.status(401).json({message: `PERMISO DENEGADO`});
      // return res.status(401).json({message: `El usuario no tiene estos roles ${ roles }`});
    }

    next();
  };
};

export { tieneRol };
