# Memotest intercolegial · Promo 2026

## Rutas públicas
- Participación: `/memotest/higschool`
- Ranking: `/memotest/higschool/ranking`
- API: `/memotest/highschool/participar`, `/memotest/highschool/:id/iniciar`, `/memotest/highschool/:id/finalizar`, `/memotest/highschool/ranking`.

La palabra `higschool` se conserva intencionalmente en las rutas del frontend tal como fue solicitada.

## Antes de publicar
1. Subir `carta-07.png` a `carta-11.png` en `front-S21/src/assets/`. El juego usa estas cinco más `carta-01.png` para los seis pares. Sin las cinco nuevas, bloquea el inicio con un mensaje.
2. Ejecutar `back-S21/sql/memotest_highschool.sql` en PostgreSQL con usuario administrador. Otorgar permisos SELECT/INSERT/UPDATE sobre `memotest_highschool` a `s21_memotest_app` si la tabla fue creada por postgres.
3. Configurar el pool de PostgreSQL mediante `DATABASE_URL` o `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`. No publicar contraseñas.
4. Desplegar backend y frontend, y confirmar que Nginx permite las rutas SPA (fallback a index.html).
5. Probar registro, bloqueo de duplicado, juego completo, ranking público, desempates y visualización móvil.

## Reglas
- Estudiantes de último año, una participación por persona.
- Gana el primer puesto individual; el premio es para el curso completo del ganador.
- El premio se anunciará más adelante.
- Se ordenan partidas completadas por menor tiempo de servidor, luego menor cantidad de movimientos, luego fecha de finalización e ID.
- Los datos de contacto no se incluyen en el ranking público.
- El ranking se actualiza automáticamente cada 10 segundos. Esta variante no modifica la campaña de la maratón.
- Se recomienda publicar bases, fecha de cierre y mecanismos de verificación de pertenencia al curso antes de lanzar la competencia.
