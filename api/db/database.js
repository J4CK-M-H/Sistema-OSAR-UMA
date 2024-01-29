import Sequelize from "sequelize";

const DATABASE = "uma";
const USERNAME = "root";
const PASSWORD = "jack98";


const connection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,
  //* opcion para desabilitar que las querys salgan por consola
  logging: false,
  timezone: "-05:30",
});

const run_connection = async () => {
  try {
    await connection.authenticate();
    connection.sync();
    console.log("CONEXION CORRECTA");
  } catch (error) {
    console.log(error);
  }
};

// export default connection;
export { run_connection, connection };

