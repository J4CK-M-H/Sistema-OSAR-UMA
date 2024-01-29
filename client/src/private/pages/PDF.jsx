import React from "react";
import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  PDFDownloadLink,
  View,
  Line,
  Font,
} from "@react-pdf/renderer";

Font.register({ family: "Book-Antiqua", src: "/fonts/Book-Antiqua.ttf" });
Font.register({
  family: "Book-Antiqua-Cursive",
  src: "/fonts/02255_ANTQUAI.ttf",
});
Font.register({ family: "Book-Antiqua-Bold", src: "/fonts/02253_ANTQUAB.ttf" });

const styles = StyleSheet.create({
  nombre: {
    fontFamily: `Book-Antiqua-Cursive`,
    fontSize: "24.3px",
    marginTop: "10px",
    marginLeft: "75px",
    textAlign: "center",
  },
  certificado_texto: {
    fontWeight: "800",
    fontFamily: `Book-Antiqua-Bold`,
    fontSize: "28px",
    textTransform: "uppercase",
    marginTop: "49px",
    // textAlign: "center",
    marginLeft: "230px"
  },
  documento: {
    position: "relative",
  },
  otorgado: {
    fontFamily: `Book-Antiqua`,
    fontWeight: "light",
    fontSize: "11.7px",
    marginLeft: "297px",
    marginTop: "11.3px"
  },
  formatText: {
    textAlign: "justify",
    width: "515px",
    fontSize: "12.9px",
    // padding: "0 4px",
    lineHeight: "2px",
    fontFamily: `Book-Antiqua`,
    fontWeight: "light",
    margin: "20px 0",
    marginLeft: "75px"
  },
  franja: {
    width: "178px",
    height: "555px",
    marginLeft: "7px",
    marginTop: "-.5px"
    // position: "absolute"
  },
  logo: {
    // height: "40px",
    width: "283px",
    marginTop: "25px",
    marginLeft: "175px",
    zIndex: "100px"
  },
  contenedor: {
    display: "flex",
    flexDirection: "row",
  },
  contenedor_descripcion: {
    // backgroundColor: "red",
    width: "600px",
    display: "flex",
    
    // alignItems: "center",
  },
  line: {
    width: "100px",
    height: "2px",
    color: "black",
    backgroundColor: "black",
  },
  marca_agua: {
    width: "210px",
    height: "210px",
    position: "absolute",
    zIndex: -1,
    margin: "160 0 0 0",
    left: "187px",
    top: "34px"
  },
});

export const PDF = ({ nombre = "Zapallito Lujan" }) => {
  let fecha_actual = new Date();
  let dia = fecha_actual.getDate();
  let mes = fecha_actual
    .toLocaleDateString("default", { month: "long" })
    .toLocaleLowerCase();
  let anio = fecha_actual.getFullYear();
  let fecha_parseada = `Lima, ${dia} de ${mes} de ${anio}`

  return (
    <Document>
      <Page orientation="landscape">
        <View style={styles.contenedor}>
          <Image src={`/franja.png`} style={styles.franja} />
          <View style={styles.contenedor_descripcion}>
            <Image src={`/logo.png`} style={styles.logo} />
            <Text style={styles.certificado_texto}>Certificado</Text>
            <Text style={styles.otorgado}> Otorgado a:</Text>
            <Text style={styles.nombre}>{ nombre }</Text>
            <Text style={styles.formatText}>
              Por su participación como <Text style={{fontWeight: 'bold', fontFamily: 'Book-Antiqua-Bold'}}>ASISTENTE</Text>, en el taller 
              <Text style={{fontWeight: 'bold', fontFamily: 'Book-Antiqua-Bold'}}>“ABORDAJE DE ENFERMERÍA EN EMERGENCIAS PREHOSPITALARIAS”</Text>, llevado a cabo del 14
              de noviembre al 19 de diciembre de 2023, organizado por la Escuela
              Profesional de Enfermería de la Universidad María Auxiliadora.
              Equivalente a 04 créditos académicos.
              
            </Text>
            <Image src={`/marca_agua.png`} style={styles.marca_agua} />
            {/* <View style={styles.line} /> */}
            {/* <Text style={{fontFamily: 'Book-Antiqua', fontSize: '11px', backgroundColor: 'red', left: '0'}}>
              {fecha_parseada}
            </Text> */}
          </View>
        </View>
      </Page>
    </Document>
  );
};
