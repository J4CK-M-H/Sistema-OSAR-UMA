const  fecha_ulti_login = () => {
  const fecha = new Date();
  const year = fecha.toLocaleString("default", { year: "numeric" });
  const month = fecha.toLocaleString("default", {
    month: "2-digit",
  });
  const day = fecha.toLocaleString("default", { day: "2-digit" });
  const time = `${fecha.toLocaleString().split(", ")[1]}`;

  const fecha_formateada = [year, month, day].join("-");

  return `${fecha_formateada} ${time}`
};

export {
  fecha_ulti_login
}