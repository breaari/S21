const server = require('./src/app.js');

server.listen(3003, () => {
  console.log('Servidor Express en funcionamiento en el puerto 3003');
  if (process.env.ACCENTURE_STORAGE_MODE === 'postgres') {
    const { startAccentureSyncWorker } = require('./src/services/accentureCaminoSyncService');
    startAccentureSyncWorker();
  }
});
