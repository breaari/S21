const nodemailer = require("nodemailer")

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, MAIL_USERNAME } = process.env;

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MAIL_USERNAME,
      //pass: process.env.MAIL_PASSWORD,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  });

  module.exports = transport;