import { useApi } from "../src/hooks/useAxios";

const subirCSV = async (event, file) => {
  event.preventDefault();
  if( file.current.files[0] == undefined ){
    alert("Suba un archivo")
    return;
  }

  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
     await useApi.post(`upload/cargar_csv`, { file: file.current.files[0] }, config)
  } catch (error) {
    console.log(error) 
  }
};

export {
  subirCSV
}