// const { form } = require("../DB_conection");
// require("dotenv").config();
// const transport = require("../mail/transport");
// const sendEmailBody = require("../mail/sendEmailBody");
// const { SMTP_USER } = process.env;


// const sendEmailController = async (input) => {
// console.log("req", input)
//   const {
//     type,
//     program,
//     equivalency,
//     modality,
//     email,
//     name,
//     lastName,
//     whatsapp,
//     branch,
//   } = input;

//   const body = await sendEmailBody( program, name, lastName);
  
//   try {

//     let mailOptions = {
//       from: SMTP_USER,
//       to: email,
//       subject: program,
//       html: body,
//     };

//     transport.verify(function (error, success) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Server is ready to take our messages");
//       }
//     });

//     transport.sendMail(mailOptions, function (err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Email sent successfully");
//       }
//     });

//     return true;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// module.exports = sendEmailController;

const { form } = require("../DB_conection");
require("dotenv").config();
const transport = require("../mail/transport");
const sendEmailBody = require("../mail/sendEmailBody");
const receiveQueriesBody = require("../mail/receiveQueriesBody");
const { SMTP_USER } = process.env;

const emailController = async (input) => {
  
  const {
    type,
    program,
    equivalency,
    modality,
    email,
    name,
    lastName,
    whatsapp,
    branch,
  } = input;
  
  try {
    // Enviar correo
    const body = await sendEmailBody(program, name, lastName);
    const emailOptions = {
      from: SMTP_USER,
      to: email,
      subject: program,
      html: body,
    };

    // Recibir consulta
    const queryBody = await receiveQueriesBody(type, program, equivalency, modality, name, lastName, whatsapp, branch);
    const queryOptions = {
      from: SMTP_USER,
      to: SMTP_USER, // Cambia el destinatario según tu lógica
      subject: "Nueva consulta",
      html: queryBody,
    };

    // Verificar el transporte (SMTP) antes de enviar correos
    transport.verify(function (error, success) {
      if (error) {
        console.log("Error al verificar el transporte:", error);
      } else {
        console.log("Transporte listo para enviar mensajes");
      }
    });

    // Enviar correo de información
    transport.sendMail(emailOptions, function (err, data) {
      if (err) {
        console.log("Error al enviar correo de información:", err);
      } else {
        console.log("Correo de información enviado con éxito");
      }
    });

    // Enviar correo de consulta
    transport.sendMail(queryOptions, function (err, data) {
      if (err) {
        console.log("Error al enviar correo de consulta:", err);
      } else {
        console.log("Correo de consulta enviado con éxito");
      }
    });

    return true; // Indicar que ambas acciones se realizaron correctamente
  } catch (error) {
    console.log("Error en el controlador emailController:", error.message);
    return false; // Indicar que ocurrió un error al realizar alguna acción
  }
};

module.exports = emailController;
