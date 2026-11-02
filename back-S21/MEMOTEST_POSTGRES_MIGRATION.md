# Migración Memotest a PostgreSQL — borrador

**No activar `MEMOTEST_STORAGE=postgres` en producción todavía.**
Falta la sincronización asíncrona con Sheets, pruebas y reconciliación de registros existentes.

## Componentes incorporados

- `src/services/memotestDb.js`: pool PostgreSQL de inicialización diferida.
- `src/services/memotestRepository.js`: consultas parametrizadas y transacciones.
- `src/controllers/memotestPgController.js`: compatibilidad de respuestas.
- `src/handlers/memotestHandler.js`: selecciona controlador mediante variable de entorno.
- `src/services/memotestRankingService.js`: selector de ranking y caché Sheets.
- `scripts/importMemotestFromSheets.js`: importación histórica con simulación.

## Variables privadas (NO subir contraseñas)

```dotenv
MEMOTEST_DB_HOST=127.0.0.1
MEMOTEST_DB_PORT=5432
MEMOTEST_DB_NAME=s21_memotest
MEMOTEST_DB_USER=s21_memotest_app
MEMOTEST_DB_PASSWORD=...
# Solo cuando todo esté importado, probado y aprobado:
# MEMOTEST_STORAGE=postgres
```

## Pruebas pendientes obligatorias

1. Comparar la rama con los archivos modificados/no versionados del VPS; no sobrescribirlos.
2. `node --check` de los archivos incorporados/modificados.
3. Copia `pg_dump` y respaldo de Sheets antes de una importación.
4. `node -r dotenv/config scripts/importMemotestFromSheets.js --dry-run`: revisar cantidades, desplazamientos y filas no identificadas.
5. Validar manualmente registros históricos y códigos de premio antes de usar `--apply`.
6. Comparar número de participantes/finalizados y primeros puestos de ambos sistemas.
7. Implementar sincronización asíncrona a Sheets mediante outbox: la partida no debe esperar a Sheets.
8. Pruebas de registro duplicado, inicio repetido, finalización repetida, caída de Google Sheets, y concurrencia.
9. Verificar SSE y cola de animaciones del frontend con varios jugadores simultáneos.
10. Cambiar almacenamiento solo después de superar estas pruebas y contar con rollback.

**Nota:** Las tablas existen en PostgreSQL, pero están vacías hasta ejecutar la importación.
