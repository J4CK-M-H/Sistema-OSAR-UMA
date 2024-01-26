import express from "express";
import authRoutes from "./routes/auth.js";
import usuarioRoutes from "./routes/usuarios.js";
import graficosRoutes from "./routes/graficos.js";
import reportesRoutes from "./routes/reportes.js";
import uploadRoutes from "./routes/upload.js";
import admisionRoutes from "./routes/admision.js";
import { run_connection } from "./db/database.js";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();
app.use(cors({
  origin: 'http://192.168.1.4:5173',
  optionsSuccessStatus: 200 
}));
app.use(express.json());
app.use(fileUpload());
run_connection();

app.use("/api/auth", authRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/graficos", graficosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admision", admisionRoutes);



app.listen(3500, '192.168.1.4');
// app.listen(3000, () => {
//   console.log("listening on Port 3000");
// });
