const { conn } = require('./src/DB_conection')
const server = require('./src/app.js');
const { DB_PORT } = process.env || 3000



conn.sync({ alter:true }).then(() => {
    server.listen(DB_PORT, () => {
      console.log(
        `Servidor Express en funcionamiento en el puerto ${DB_PORT}`
      );
    });
  });