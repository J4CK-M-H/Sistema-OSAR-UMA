import { request, response } from "express";
// import UsuarioSchema from "../models/usuarioModel.js";
import { generarJWT } from "../helpers/generar-token.js";
import { connection } from "../db/database.js";
import { QueryTypes } from "sequelize";

const session = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  let query = `SELECT u.usuario, u.estado, u.idusuario, u.nombre, r.nombrerol FROM usuarios as u 
  INNER JOIN rol as r ON r.idrol = u.idrol
  where u.usuario = "${username}" and u.password = "${password}"`;

  const validar_usuario = await connection.query(query, {
    type: QueryTypes.SELECT,
    raw: false,
  });

  if (validar_usuario.length == 0) {
    return res.status(400).json({ message: "Usuario/Password incorrectos" });
  }

  const token = generarJWT(
    validar_usuario[0].usuario,
    validar_usuario[0].nombrerol
  );

  let user = {
    rol: validar_usuario[0].rol,
    idusuario: validar_usuario[0].idusuario,
    usuario: validar_usuario[0].usuario,
    nombres: validar_usuario[0].nombre,
    nombrerol: validar_usuario[0].nombrerol
  };

  let data_user = { ...user, token };
  return res.status(200).json(data_user);
};

const register = async (req = request, res = response) => {
  //const { nombres, usuarios, password, estado, rol } = req.body;

  return res.status(200).json({ msg: "register" });
};

export { login, session, register };
