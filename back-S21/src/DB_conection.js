require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const form = require('./models/form')

 const sequelize = new Sequelize(
   `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

form(sequelize);

module.exports = {
    ...sequelize.models,
    conn: sequelize,
  };