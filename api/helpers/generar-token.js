import jwt from "jsonwebtoken";

const generarJWT = (usuario = "", rol = "") => {
  return jwt.sign({ usuario, rol }, "MY_SECRET_KEY", {
    expiresIn: "1d",
  });
};

export { generarJWT };
