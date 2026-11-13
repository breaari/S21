-- Ejecución manual antes de activar /accenture/camino
-- NO modificar las tablas existentes del memotest.
CREATE TABLE IF NOT EXISTS accenture_camino_participantes (
 id UUID PRIMARY KEY,
 nombre VARCHAR(80) NOT NULL,
 apellido VARCHAR(80) NOT NULL,
 email VARCHAR(180) NOT NULL UNIQUE,
 telefono VARCHAR(15) NOT NULL,
 respuestas JSONB NOT NULL,
 permiso_contacto BOOLEAN NOT NULL DEFAULT FALSE,
 acepta_privacidad BOOLEAN NOT NULL,
 codigo_retiro VARCHAR(24) NOT NULL UNIQUE,
 merch_entregado BOOLEAN NOT NULL DEFAULT FALSE,
 origen VARCHAR(60) NOT NULL DEFAULT 'feria-accenture-2026',
 fecha_registro TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_accenture_camino_fecha ON accenture_camino_participantes(fecha_registro);
CREATE INDEX IF NOT EXISTS idx_accenture_camino_contacto ON accenture_camino_participantes(permiso_contacto);
-- Reportes agregados: SELECT respuestas->>'aspiracion' AS camino, count(*) FROM accenture_camino_participantes GROUP BY 1;
