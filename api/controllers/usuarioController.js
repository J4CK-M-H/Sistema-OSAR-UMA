// import { connection } from "../db/database.js";

import { QueryTypes } from "sequelize";
import { connection } from "../db/database.js";
import { request, response } from "express";

const insertarUsuario = async (req, res) => {
  // const nuevo_usuario = await connection.query(
  //   "INSERT INTO usuarios (nombres,usuario,password,rol) VALUES ('jack','jack98','2698','ADMIN')"
  // );
  // return res.status(201).json(nuevo_usuario);
};

const obtenerUsuarios = async (req, res) => {
  const usuarios = await connection.query(
    "SELECT u.*, nombrerol FROM usuarios as u INNER JOIN rol as r ON r.idrol = u.idrol",
    {
      type: QueryTypes.SELECT,
      raw: false,
    }
  );
  return res.status(200).json(usuarios);
};

const editar_estado = async (req = request, res = response) => {
  const { estado } = req.params;
  const { idusuario } = req.body;

  let estadoValue = parseInt(estado);

  if (estadoValue == 1) {
    estadoValue = 0;
  } else {
    estadoValue = 1;
  }

  try {
    await connection.query("SET SQL_SAFE_UPDATES = 0;", {
      type: QueryTypes.UPDATE,
      raw: false,
    });

    let query = `UPDATE usuarios set estado = ${estadoValue} where idusuario = ${idusuario}`;
    await connection.query(query, {
      type: QueryTypes.UPDATE,
      raw: true,
    });
    
    const usuario = await connection.query(
      `SELECT u.*, r.nombrerol FROM usuarios as u INNER JOIN rol as r ON r.idrol = u.idrol WHERE u.idusuario = ${idusuario}`,
      {
        type: QueryTypes.SELECT,
        raw: false,
      }
    );
    return res.status(200).json(usuario[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editar_usuario = async (req = request, res) => {
  const { idusuario } = req.params;
  const { nombre, idrol, usuario, password } = req.body.usuarioEdit;

  let query = `UPDATE usuarios SET nombre= '${nombre}', idrol= ${idrol}, usuario= '${usuario}', password= '${password}' WHERE idusuario = ${idusuario}`;

  try {
    await connection.query(query, {
      type: QueryTypes.UPDATE,
      raw: false,
    });

    const usuarioActualizado = await connection.query(
      `SELECT u.*, r.nombrerol FROM usuarios as u INNER JOIN rol as r ON r.idrol = u.idrol WHERE u.idusuario = ${idusuario}`,
      {
        type: QueryTypes.SELECT,
        raw: false,
      }
    );

    return res.status(200).json(usuarioActualizado[0]);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const eliminar_usuario = async (req = request, res) => {
  const { idusuario } = req.params;

  let query = `DELETE FROM usuarios WHERE idusuario =${idusuario}`;

  await connection.query(query, {
    type: QueryTypes.DELETE,
    raw: false,
  });

  return res.status(200).json(idusuario);
};

export {
  obtenerUsuarios,
  insertarUsuario,
  editar_estado,
  editar_usuario,
  eliminar_usuario,
};
