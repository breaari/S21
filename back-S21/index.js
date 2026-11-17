const server = require('./src/app.js');
const {startAccentureSyncWorker}=require("./src/services/accentureCaminoSyncService");

server.listen(3003, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${3003}`);
  if(process.env.ACCENTURE_STORAGE_MODE==="postgres")startAccentureSyncWorker();
});