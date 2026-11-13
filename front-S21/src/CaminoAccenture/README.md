# Accenture · Construí tu futuro (MVP)

## Rutas
- Frontend: `/accenture/camino` (React/Vite)
- Endpoint: `POST /accenture-camino/participar` (Express)
- Se utiliza el **mismo Google Spreadsheet** que la ruleta/memotest mediante `RULETA_SHEET_ID`.
- Se crea automáticamente una **pestaña nueva**: `Accenture 2026`. No modifica el memotest ni sus registros.
- Se puede configurar otro documento con `ACCENTURE_SHEET_ID` o cambiar el nombre de pestaña con `ACCENTURE_SHEET_NAME`.

## Experiencia
1. Portada «Construí tu futuro».
2. Cuatro decisiones: aspiración, área laboral, formación previa e intereses.
3. Baldosas seleccionables y arrastrables con feedback de encastre.
4. Registro con autorización de marketing separada y opcional.
5. Ruta orientativa, código de retiro y posibilidad de asesoramiento presencial.

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
- En el **primer registro** crea la pestaña `Accenture 2026` y sus 18 columnas.
- Los datos personales se guardan con `valueInputOption: RAW` para no interpretar fórmulas.
- Se controla correo repetido leyendo la pestaña, aunque no hay bloqueo transaccional ante envíos simultáneos.
- El frontend **no escribe directamente** en Google Sheets: utiliza el endpoint Express existente, que protege las credenciales.

Columnas: Fecha, Hora, ID, Nombre, Apellido, Email, Telefono, Aspiracion, Area de trabajo, Nivel de estudios, Area de interes, Consentimiento datos, Autoriza contacto comercial, Origen, Codigo retiro, Merch entregado, Interes en inscripcion, Estado comercial.

## Antes de publicar
- Añadir política de privacidad efectiva y contacto para ejercer derechos, además de definir conservación y eliminación de datos.
- Validar con Accenture el uso de nombres/logos y las condiciones de la feria.
- Validar el catálogo 2027, requisitos de admisión, modalidad, costos, y la promoción adicional (sin asumir acumulación con 10%).
- Probar el endpoint y permisos en Google Sheets, concurrencia, celulares y WiFi.
- Establecer mecanismo de canje (la columna «Merch entregado» comienza en NO; no existe aún un panel de canje).
- No hay integración a CRM ni IA externa; las recomendaciones actuales son reglas orientativas por área.
