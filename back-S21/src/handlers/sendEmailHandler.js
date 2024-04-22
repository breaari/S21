const sendEmailController = require("../controllers/sendEmailController");

const sendEmailHandler = async (req,res) => {
 const input = req.body
  try {
    const result = await sendEmailController(input);
    if (!result) return res.status(404).send("error al enviar email");
    return res.send("Error al enviar la consulta");
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error)
  }
};

module.exports = { sendEmailHandler };