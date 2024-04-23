
  // const sendEmailBody = (program, name, lastName) => {
  //   const body = `
  //     <h1>Hola ${name} ${lastName}! </h1>
  //     <p>Recibimos tu consulta sobre la ${program}</p>
  //     <p>información</p>
  //     <p>pdf</p>
  //     <h2>saludos!</h2>
  //     <a href="http://localhost:5174"><h3>Ver pdf? podría</h3></a>
  //     `;
  
  //   return body;
  // };
  
  // module.exports = sendEmailBody;

  const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../Carreras/carreras.json');

const sendEmailBody = async (program, name, lastName) => {
  try {
    // Lee el archivo JSON que contiene la información de las carreras
    const rawdata = fs.readFileSync(jsonPath);
    const carreras = JSON.parse(rawdata);

    // Busca la carrera que coincide con el nombre recibido en 'program'
    const carrera = carreras.Carreras.find(c => c.name === program);

    if (!carrera) {
      throw new Error(`No se encontró información para la carrera '${program}'`);
    }

    const { url } = carrera;

    // Genera el cuerpo del correo con la URL obtenida
    const body = `
      <h1>Hola ${name} ${lastName}! </h1>
      <p>Recibimos tu consulta sobre la ${program}</p>
      <p>Aquí tienes más información:</p>
      <a href="${url}"><h3>Ver información del programa</h3></a>
      <h2>¡Saludos!</h2>
    `;

    return body;
  } catch (error) {
    console.error('Error al generar el cuerpo del correo:', error);
    throw error; // Propaga el error para manejarlo en el controlador
  }
};

module.exports = sendEmailBody;

