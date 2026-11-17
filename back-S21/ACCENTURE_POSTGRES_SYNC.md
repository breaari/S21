# Accenture · PostgreSQL + Google Sheets en vivo

## Estado
Implementación en rama `feature/accenture-camino-2026`. **No se activa automáticamente.**
El modo anterior (guardar directo en Sheets) permanece activo mientras `ACCENTURE_STORAGE_MODE` no sea `postgres`.

## Diseño
1. `POST /accenture-camino/participar` crea la participación en PostgreSQL con `UNIQUE(email)`; devuelve el mismo formato que antes.
2. `POST /accenture-camino/:id/finalizar` guarda las 4 respuestas con un `UPDATE` idempotente por UUID.
3. Un worker cada 5 s (configurable) consulta los cambios pendientes y los sincroniza a la pestaña `Accenture 2026`.
4. Los registros nuevos se agregan con un único `values.append` por lote de hasta 100. Para IDs existentes se actualizan **solo H:K** mediante `values.batchUpdate`.
5. **Nunca se sobreescriben las columnas O:R:** código, merch entregado, interés en inscripción y estado comercial. Las marcas manuales del stand permanecen.
6. Un bloqueo asesor PostgreSQL impide que varias instancias PM2 sincronicen el mismo lote a la vez. Ante errores, se programa reintento. Si se agregó la fila y se perdió la confirmación, la lectura de IDs de Sheets evita duplicarla.
7. Una falla temporal de Sheets no frena el registro: PostgreSQL es la fuente de verdad. El juego solo necesita que PostgreSQL responda.

**La sincronización es casi en vivo, no instantánea ni garantizada en 5 s.** Su latencia real depende de red, backlog y cuotas Google.

## Preparación del VPS (no ejecutar git pull ni reset en /root/backendS21)
1. **Respaldo:** exportar base PostgreSQL y guardar una copia del Google Sheet antes de cambiar nada.
2. **Migración PostgreSQL**: ejecutar `sql/accenture_camino_pg.sql` en la base elegida (por ejemplo `s21_memotest`), con usuario administrador.
   Otorgar `GRANT SELECT, INSERT, UPDATE ON accenture_participantes TO s21_memotest_app;` si esa es la cuenta que utiliza el backend.
3. **Configuración del backend:** usar credenciales existentes o variables de PostgreSQL. Configurar:
   - El módulo usa `ACCENTURE_DATABASE_URL` si existe; si no, usa `ACCENTURE_PG_HOST/PORT/DATABASE/USER/PASSWORD` o las variables ya existentes `MEMOTEST_DB_HOST/PORT/NAME/USER/PASSWORD` del servidor. No es necesario duplicar credenciales.
   - `ACCENTURE_SHEET_ID`: ID del Sheet; si no está definido toma `RULETA_SHEET_ID`.
   - `ACCENTURE_SHEET_NAME`: opcional, predeterminado `Accenture 2026`.
   - `ACCENTURE_SYNC_INTERVAL_MS`: opcional, predeterminado `5000`.
   - `ACCENTURE_STORAGE_MODE`: mantener sin definir durante la instalación.
4. Copiar al VPS vía FileZilla los archivos nuevos y modificados **sin reemplazar otros cambios existentes**:
   - `src/services/accentureCaminoPgService.js` (nuevo)
   - `src/services/accentureCaminoSyncService.js` (nuevo)
   - `src/handlers/accentureCaminoHandler.js` (actualizado; comparar con versión del VPS)
   - `index.js` (actualizado; fusionar manualmente si tiene personalizaciones)
   - `scripts/accentureImportSheets.js` (nuevo)
   - `sql/accenture_camino_pg.sql` (nuevo)
5. Verificar sintaxis: `node --check index.js`, `node --check src/handlers/accentureCaminoHandler.js`, `node --check src/services/accentureCaminoPgService.js`, `node --check src/services/accentureCaminoSyncService.js`, `node --check scripts/accentureImportSheets.js`.
6. **Pausar nuevas participaciones durante la transición.** Importar las filas ya existentes en Sheets a PostgreSQL:
   `node scripts/accentureImportSheets.js`
   Revisar totales importados/omitidos; comprobar que no se omitieron correos legítimos. El script no escribe en Sheets.
7. Habilitar `ACCENTURE_STORAGE_MODE=postgres` en el entorno de PM2 y reiniciar con `pm2 restart backendS21 --update-env`. Comprobar logs.
8. En una hoja de prueba separada, probar varias participaciones simultáneas, reintentos y una caída de la API de Sheets. Verificar que las columnas O:R sigan intactas. **No ejecutar una prueba de carga destructiva sobre la hoja de producción**.

## Monitoreo SQL
```sql
SELECT COUNT(*) total,
  COUNT(*) FILTER (WHERE finalizado_en IS NOT NULL) finalizados,
  COUNT(*) FILTER (WHERE synced_version < version) pendientes
FROM accenture_participantes;

SELECT id, email, sync_attempts, LEFT(sync_error,150) AS error
FROM accenture_participantes WHERE synced_version < version
ORDER BY creado_en LIMIT 30;
```

## Límites conocidos y precauciones
- Los datos ya existentes en Sheets se importan una sola vez antes del cambio de modo. Si se crean nuevos registros por la ruta vieja durante la transición, importar de nuevo antes de activar el nuevo modo.
- Para la entrega del regalo, Sheets muestra registros con una demora de segundos bajo condiciones normales. Si Sheets queda inaccesible, el respaldo está en PostgreSQL; el personal necesita un procedimiento de consulta autorizado por ID/nombre desde SQL o una interfaz interna futura.
- No exponer endpoints públicos que devuelvan nombres, teléfonos o correos.
- El código no ha sido desplegado ni sometido a pruebas de carga reales por esta implementación. No habilitarlo durante una actividad sin validación previa.
- El proceso que tenga el worker debe iniciarse desde `back-S21/index.js` como servicio PM2 y contar con Google Sheets credentials.
