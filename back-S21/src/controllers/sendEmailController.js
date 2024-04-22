const { form } = require("../DB_conection");
require("dotenv").config();
const transport = require("../mail/transport");
const sendEmailBody = require("../mail/sendEmailBody");
const { MAIL_USERNAME } = process.env;


const sendEmailController = async (input) => {
console.log("req", input)
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

  const body = sendEmailBody( program, name, lastName);
  
  try {

    let mailOptions = {
      from: MAIL_USERNAME,
      to: email,
      subject: "Información",
      html: body   ,
    };

    transport.sendMail(mailOptions, function (err, data) {
      if (err) {
        throw Error(err.message);
      } else {
        console.log("Email sent successfully");
      }
    });

    return true;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = sendEmailController;