import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors);
  }

  next();
};

const validarFechaEmision = (fecha_emision) => {
  // fecha_emision
  let dia_emision = Number(fecha_emision.split("-")[0]);
  let mes_emision = Number(fecha_emision.split("-")[1]);
  let anio_emision = Number(fecha_emision.split("-")[2]);

  if (fecha_emision.split("-").length > 3) {
    return res
      .status(404)
      .json({
        msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
      });
  }

  if (isNaN(dia_emision))
    return res
      .status(404)
      .json({
        msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
      });

  if (isNaN(mes_emision))
    return res
      .status(404)
      .json({
        msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
      });

  if (isNaN(anio_emision))
    return res
      .status(404)
      .json({
        msg: `Formato incorrecto de la fecha_emision: ${fecha_emision}`,
      });


};

export { validarCampos, validarFechaEmision };
