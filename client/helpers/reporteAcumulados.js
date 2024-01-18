const prepado_acumulado = (arrayValores) => {
  let totalCicloI = 0;
  let totalCicloII = 0;
  let totalCicloIII = 0;
  let totalCicloIV = 0;
  let totalCicloV = 0;
  let totalCicloVI = 0;
  let totalCicloVII = 0;
  let totalCicloVIII = 0;
  let totalCicloIX = 0;
  let totalCicloX = 0;
  let totalCiclos = 0;

  arrayValores.forEach((element) => {
    for (const key in element) {
      // console.log(`${key}: ${ element[key] }`);
      if (key == "CICLO1") {
        totalCicloI = totalCicloI + parseInt(element[key]);
      }
      if (key == "CICLO2") {
        totalCicloII = totalCicloII + parseInt(element[key]);
      }
      if (key == "CICLO3") {
        totalCicloIII = totalCicloIII + parseInt(element[key]);
      }
      if (key == "CICLO4") {
        totalCicloIV = totalCicloIV + parseInt(element[key]);
      }
      if (key == "CICLO5") {
        totalCicloV = totalCicloV + parseInt(element[key]);
      }
      if (key == "CICLO6") {
        totalCicloVI = totalCicloVI + parseInt(element[key]);
      }
      if (key == "CICLO7") {
        totalCicloVII = totalCicloVII + parseInt(element[key]);
      }
      if (key == "CICLO8") {
        totalCicloVIII = totalCicloVIII + parseInt(element[key]);
      }
      if (key == "CICLO9") {
        totalCicloIX = totalCicloIX + parseInt(element[key]);
      }
      if (key == "CICLO10") {
        totalCicloX = totalCicloX + parseInt(element[key]);
      }
      if (key == "TOTAL") {
        totalCiclos = totalCiclos + parseInt(element[key]);
      }
    }
  });

  return [
    totalCicloI,
    totalCicloII,
    totalCicloIII,
    totalCicloIV,
    totalCicloIV,
    totalCicloVI,
    totalCicloVII,
    totalCicloVIII,
    totalCicloIX,
    totalCicloX,
    totalCiclos,
  ];
};

const segunda_especialidad_acumulado = (arrayValores) => {
  let totalCicloI = 0;
  let totalCicloII = 0;
  let totalCicloIII = 0;
  let totalCicloIV = 0;
  let totalCicloV = 0;
  let totalCicloVI = 0;
  let totalCicloVII = 0;
  let totalCicloVIII = 0;
  let totalCicloIX = 0;
  let totalCicloX = 0;
  let totalCiclos = 0;

  arrayValores.forEach((element) => {
    for (const key in element) {
      // console.log(`${key}: ${ element[key] }`);
      if (key == "CICLO1") {
        totalCicloI = totalCicloI + parseInt(element[key]);
      }
      if (key == "CICLO2") {
        totalCicloII = totalCicloII + parseInt(element[key]);
      }
      if (key == "CICLO3") {
        totalCicloIII = totalCicloIII + parseInt(element[key]);
      }
      // if (key == "CICLO4") {
      //   totalCicloIV = totalCicloIV + parseInt(element[key]);
      // }
      // if (key == "CICLO5") {
      //   totalCicloV = totalCicloV + parseInt(element[key]);
      // }
      // if (key == "CICLO6") {
      //   totalCicloVI = totalCicloVI + parseInt(element[key]);
      // }
      // if (key == "CICLO7") {
      //   totalCicloVII = totalCicloVII + parseInt(element[key]);
      // }
      // if (key == "CICLO8") {
      //   totalCicloVIII = totalCicloVIII + parseInt(element[key]);
      // }
      // if (key == "CICLO9") {
      //   totalCicloIX = totalCicloIX + parseInt(element[key]);
      // }
      // if (key == "CICLO10") {
      //   totalCicloX = totalCicloX + parseInt(element[key]);
      // }
      if (key == "TOTAL") {
        totalCiclos = totalCiclos + parseInt(element[key]);
      }
    }
  });

  return [totalCicloI, totalCicloII, totalCicloIII, totalCiclos];
};

const maestria_acumulado = (arrayValores) => {
  let totalCicloI = 0;
  let totalCicloII = 0;
  let totalCicloIII = 0;
  let totalCicloIV = 0;
  // let totalCicloV = 0;
  // let totalCicloVI = 0;
  // let totalCicloVII = 0;
  // let totalCicloVIII = 0;
  // let totalCicloIX = 0;
  // let totalCicloX = 0;
  let totalCiclos = 0;

  arrayValores.forEach((element) => {
    for (const key in element) {
      // console.log(`${key}: ${ element[key] }`);
      if (key == "CICLO1") {
        totalCicloI = totalCicloI + parseInt(element[key]);
      }
      if (key == "CICLO2") {
        totalCicloII = totalCicloII + parseInt(element[key]);
      }
      if (key == "CICLO3") {
        totalCicloIII = totalCicloIII + parseInt(element[key]);
      }
      if (key == "CICLO4") {
        totalCicloIV = totalCicloIV + parseInt(element[key]);
      }
      if (key == "TOTAL") {
        totalCiclos = totalCiclos + parseInt(element[key]);
      }
    }
  });
  console.log([totalCicloI, totalCicloII, totalCicloIII, totalCicloIV, totalCiclos]);
  return [totalCicloI, totalCicloII, totalCicloIII, totalCicloIV, totalCiclos];
};

export {
  prepado_acumulado,
  segunda_especialidad_acumulado,
  maestria_acumulado,
};
