# Accenture · Construí tu futuro (MVP)

## Rutas
- Frontend: `/accenture/camino` (React/Vite)
- Backend: `POST /accenture-camino/participar` (Express)
- No reemplaza `/memotest` ni altera sus tablas.

## Experiencia
1. Portada «Construí tu futuro».
2. Cuatro decisiones: aspiración, área laboral, punto de partida académico, área de interés.
3. Selección de baldosas y colocación en camino, con feedback de encastre y avance.
4. Registro voluntario con autorización específica de marketing (desmarcada por defecto).
5. Ruta personalizada orientativa, código único de retiro de merchandising, consulta presencial para inscripción.

Las baldosas se pueden **tocar y colocar** o **arrastrar hasta el espacio iluminado**.
La mecánica se adapta a pantallas móviles y respeta `prefers-reduced-motion`.

## Preparación local
```bash
git fetch origin
git switch feature/accenture-camino-2026
cd front-S21
npm install
npm run dev
```
Backend desde otra terminal:
```bash
cd back-S21
npm install
# Configurá PGHOST, PGPORT, PGUSER, PGPASSWORD y PGDATABASE
# o DATABASE_URL en el entorno del proceso.
npm start
```

## Base de datos
Ejecutar una sola vez el archivo `back-S21/sql/accenture_camino.sql` en la base elegida, por ejemplo:
```bash
psql -d s21_memotest -f back-S21/sql/accenture_camino.sql
```
El backend debe tener permisos para INSERT. No reutilizar las tablas de memotest.

## Antes de publicar (obligatorio)
- Añadir URL real de política de privacidad y contacto para ejercer derechos. Definir conservación y eliminación de datos.
- Validar con Accenture uso de logos/nombre y autorizaciones para la activación.
- Sustituir `PROGRAMAS_POR_AREA` por el catálogo **aprobado de oferta 2027**, con elegibilidad, requisitos, modalidades, enlaces oficiales y aranceles vigentes.
- Confirmar promoción adicional y si acumula con el 10% del convenio. **No hay promoción adicional implementada**.
- Probar el endpoint con PostgreSQL, conexión móvil y concurrencia; ensayar en el dispositivo real.
- Definir circuito de canje de merchandising, verificación de código y mecanismo comercial de inscripción.
- Implementar, si se aprueba, seguimiento CRM/reportes y comunicación a leads con consentimiento.
- No hay generación de recomendaciones mediante API de IA: versión inicial utiliza reglas deterministas por área.

## Seguridad
- Los datos personales se guardan únicamente al completar registro en PostgreSQL.
- Consentimiento comercial separado y desmarcado por defecto.
- `email` es único para limitar duplicados; el código no se revela si el correo ya fue registrado.
- No publicar listados de participantes ni exponer endpoints de administración sin autenticación.
