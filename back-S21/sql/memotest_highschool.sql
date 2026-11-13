-- Ejecutar en la misma base PostgreSQL del memotest, antes de publicar la nueva versión.
-- Competencia aislada: no altera memotest_participantes ni memotest_partidas.
CREATE TABLE IF NOT EXISTS memotest_highschool (
 id UUID PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 apellido VARCHAR(100) NOT NULL,
 email VARCHAR(254) NOT NULL,
 telefono VARCHAR(30) NOT NULL,
 colegio VARCHAR(180) NOT NULL,
 curso VARCHAR(30) NOT NULL,
 division VARCHAR(30) NOT NULL DEFAULT '',
 anio VARCHAR(30) NOT NULL,
 proximo_paso VARCHAR(100) NOT NULL,
 decision_carrera VARCHAR(100) NOT NULL,
 areas_interes JSONB NOT NULL DEFAULT '[]'::jsonb,
 origen VARCHAR(100) NOT NULL DEFAULT 'directo',
 estado VARCHAR(20) NOT NULL DEFAULT 'REGISTRADO',
 inicio_juego TIMESTAMPTZ,
 fin_juego TIMESTAMPTZ,
 tiempo_ms BIGINT,
 movimientos INTEGER,
 completado BOOLEAN NOT NULL DEFAULT FALSE,
 creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CONSTRAINT hs_estado CHECK (estado IN ('REGISTRADO','JUGANDO','FINALIZADO')),
 CONSTRAINT hs_movimientos CHECK (movimientos IS NULL OR movimientos BETWEEN 0 AND 100000)
);
CREATE UNIQUE INDEX IF NOT EXISTS hs_email_unico ON memotest_highschool (LOWER(email));
CREATE UNIQUE INDEX IF NOT EXISTS hs_telefono_unico ON memotest_highschool (regexp_replace(telefono, '[^0-9]', '', 'g'));
CREATE INDEX IF NOT EXISTS hs_ranking_idx ON memotest_highschool (completado DESC, tiempo_ms ASC, movimientos ASC) WHERE estado='FINALIZADO';
