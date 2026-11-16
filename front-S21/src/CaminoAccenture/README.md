# Accenture · Construí tu futuro (MVP)

## Rutas
- Frontend: `/accenture/camino` (React/Vite)
- Endpoint inicial: `POST https://back.universidadsiglo21online.com/accenture-camino/participar` (Express)
- Endpoint al terminar: `POST https://back.universidadsiglo21online.com/accenture-camino/:id/finalizar` (Express)
- Se utiliza el **mismo Google Spreadsheet** que la ruleta/memotest mediante `RULETA_SHEET_ID`.
- Se crea automáticamente una **pestaña nueva**: `Accenture 2026`. No modifica el memotest ni sus registros.
- Se puede configurar otro documento con `ACCENTURE_SHEET_ID` o cambiar el nombre de pestaña con `ACCENTURE_SHEET_NAME`.

## Experiencia
1. Portada «Construí tu futuro».
2. **Formulario al inicio**: nombre, apellido, email, WhatsApp y consentimiento comercial separado y opcional. Al tocar «CONSTRUIR MI CAMINO» se envían los datos inmediatamente al backend público y se crea una fila en Google Sheets con respuestas inicialmente vacías.
3. Cuatro decisiones: aspiración, área laboral, formación previa e intereses. Cada respuesta puede arrastrarse a la baldosa iluminada o tocarse y colocarse con el botón.
4. Tras la cuarta baldosa se **actualizan las columnas H:K de la misma fila** de Google Sheets usando el ID recibido al registrarse. Si abandona, la fila inicial queda guardada sin respuestas.
5. Resultado de identificación aspiracional: Liderar, Innovar, Crecer, Emprender o Especializarme. No es una evaluación psicométrica.
6. Recomendaciones filtradas por aspiración, interés, trabajo y estudios, código de retiro y posibilidad de asesoramiento presencial.

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
npm start
```

## Google Sheets
El backend usa el servicio de Google Sheets ya configurado:
- Credenciales en `back-S21/google-sheets-credentials.json` (no versionarlas).
- ID del documento en `RULETA_SHEET_ID` o, si se prefiere, `ACCENTURE_SHEET_ID`.
- La cuenta de servicio debe tener permiso de edición sobre el documento.
- En el **primer registro** crea la pestaña `Accenture 2026` y sus 18 columnas. El registro previo conserva la captación incluso si la persona abandona el juego.
- Los datos personales se guardan con `valueInputOption: RAW` para no interpretar fórmulas.
- Se controla correo repetido leyendo la pestaña, aunque no hay bloqueo transaccional ante envíos simultáneos.
- El frontend **no escribe directamente** en Google Sheets: utiliza el endpoint Express existente, que protege las credenciales.

Columnas: Fecha, Hora, ID, Nombre, Apellido, Email, Telefono, Aspiracion, Area de trabajo, Nivel de estudios, Area de interes, Consentimiento datos, Autoriza contacto comercial, Origen, Codigo retiro, Merch entregado, Interes en inscripcion, Estado comercial.

## Catálogo académico
El archivo `catalogoDistancia.js` contiene propuestas tomadas de páginas oficiales de Siglo 21 (noviembre 2026): pregrado, grado, cursos, certificados, diplomaturas, especializaciones y maestrías **a distancia**. Los enlaces directos se utilizan solo cuando se verificó la URL, y en otros casos se vincula al catálogo oficial. Para posgrados se requiere, como mínimo, indicar título universitario y validar el requisito de admisión específico con un asesor. La selección ofrece hasta cuatro opciones variadas; no presenta todas las categorías a cada usuario.

## Desarrollo local y despliegue
- **Incluso desde localhost**, el frontend llama siempre a `https://back.universidadsiglo21online.com`. No requiere levantar Express localmente para las solicitudes de esta pantalla.
- Esto **no implica** que el endpoint exista todavía en producción: es obligatorio desplegar la rama del backend en el servidor público antes de probar los registros. Si falta la ruta, el formulario mostrará un error.
- Las pruebas locales crean datos reales en Sheets; usar contactos de prueba y eliminarlos después, y evitar información personal auténtica sin permiso.
- El endpoint final modifica solo las cuatro columnas de respuestas y no duplica la participación.

## Antes de publicar
- Añadir política de privacidad efectiva y contacto para ejercer derechos, además de definir conservación y eliminación de datos.
- Validar con Accenture el uso de nombres/logos y las condiciones de la feria.
- Validar el catálogo 2027, requisitos de admisión, modalidad, costos, y la promoción adicional (sin asumir acumulación con 10%).
- Probar el endpoint y permisos en Google Sheets, concurrencia, celulares y WiFi.
- Establecer mecanismo de canje (la columna «Merch entregado» comienza en NO; no existe aún un panel de canje).
- No hay integración a CRM ni IA externa; las recomendaciones actuales son reglas orientativas por área.
