import { response } from "express";

const esAdmin = (req,res = response, next ) => {
  
  if( req.usuario?.idrol != 1 ) {
    return res.status(401).json({ message: 'NO TE CREAS CHISTOSO COMPARE.' });
  }

  next();
};

export { esAdmin }