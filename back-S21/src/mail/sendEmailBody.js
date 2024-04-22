
  const sendEmailBody = (program, name, lastName) => {
    const body = `
      <h1>Hola ${name} ${lastName}! </h1>
      <p>Recibimos tu consulta sobre la ${program}</p>
      <p>información</p>
      <p>pdf</p>
      <h2>saludos!</h2>
      <a href="http://localhost:5174"><h3>Ver pdf? podría</h3></a>
      `;
  
    return body;
  };
  
  module.exports = sendEmailBody;

