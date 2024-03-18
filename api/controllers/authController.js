import { request, response } from "express";
// import UsuarioSchema from "../models/usuarioModel.js";
import { generarJWT } from "../helpers/generar-token.js";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";
import { fecha_ulti_login } from "../helpers/fechas.js";

const session = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  let query = `SELECT u.usuario, u.estado, u.idusuario, u.idrol, u.nombre, r.nombrerol FROM usuarios as u 
  INNER JOIN rol as r ON r.idrol = u.idrol
  where u.usuario = "${username}" and u.password = "${password}"`;

  const validar_usuario = await connection.query(query, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  if (validar_usuario.length == 0) {
    return res.status(400).json({ message: "Usuario/Password incorrectos" });
  }
  
  if( validar_usuario[0].estado == 0 ){
    return res.status(401).json({ message: "Usuario deshabilitado!" });
  }

  await connection.query("SET SQL_SAFE_UPDATES = 0", {
    type: QueryTypes.UPDATE,
    raw: false,
  });

  await connection.query(
    `UPDATE usuarios SET ultimo_login = '${fecha_ulti_login()}' where usuario = '${username}' AND password = '${password}'`,
    {
      type: QueryTypes.UPDATE,
      raw: false,
    }
  );

  const token = generarJWT(
    validar_usuario[0].usuario,
    validar_usuario[0].nombrerol
  );

  let user = {
    rol: validar_usuario[0].rol,
    idusuario: validar_usuario[0].idusuario,
    usuario: validar_usuario[0].usuario,
    nombre: validar_usuario[0].nombre,
    nombrerol: validar_usuario[0].nombrerol,
    idrol: validar_usuario[0].idrol,
  };

  let data_user = { ...user, token };
  return res.status(200).json(data_user);
};

const register = async (req = request, res = response) => {
  //const { nombres, usuarios, password, estado, rol } = req.body;

  return res.status(200).json({ msg: "register" });
};

export { login, session, register };
