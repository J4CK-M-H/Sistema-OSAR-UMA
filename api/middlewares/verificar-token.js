import { request, response } from "express";
import jwt from "jsonwebtoken";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";

const validarToken = async (req = request, res = response, next) => {
  console.log(req.headers?.authorization);
  if (
    req.headers?.authorization &&
    req.headers?.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const { usuario: username } = jwt.verify(token, "MY_SECRET_KEY");
      const verificacion = await connection.query(
        `SELECT u.usuario, u.estado, u.idusuario, u.nombre, u.idrol, r.nombrerol FROM usuarios as u 
      INNER JOIN rol as r ON r.idrol = u.idrol
      where u.usuario = "${username}"`,
        {
          type: QueryTypes.SELECT,
          raw: false,
        }
      );

      req.usuario = verificacion[0];

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token no valido" });
    }
  } else {
    return res.status(401).json({ message: "No hay token en la peticion" });
  }
};

export default validarToken;
