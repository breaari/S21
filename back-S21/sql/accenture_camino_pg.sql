-- Ejecutar en la base PostgreSQL elegida, con un usuario autorizado.
-- No modifica tablas existentes del memotest.
CREATE TABLE IF NOT EXISTS accenture_participantes (
  id UUID PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  telefono VARCHAR(15) NOT NULL,
  acepta_privacidad BOOLEAN NOT NULL DEFAULT TRUE,
  permiso_contacto BOOLEAN NOT NULL DEFAULT FALSE,
  origen VARCHAR(100) NOT NULL DEFAULT 'feria-accenture-2026',
  respuestas JSONB NOT NULL DEFAULT '{}'::jsonb,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finalizado_en TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1,
  synced_version INTEGER NOT NULL DEFAULT 0,
  sync_attempts INTEGER NOT NULL DEFAULT 0,
  sync_retry_after TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sync_error TEXT,
  CONSTRAINT accenture_version_check CHECK (version >= 1 AND synced_version >= 0 AND synced_version <= version)
);
CREATE INDEX IF NOT EXISTS idx_accenture_sync
  ON accenture_participantes(sync_retry_after, creado_en) WHERE synced_version < version;
CREATE INDEX IF NOT EXISTS idx_accenture_nombre
  ON accenture_participantes(lower(apellido), lower(nombre));
-- Ejemplo si el usuario de la app es s21_memotest_app:
-- GRANT SELECT, INSERT, UPDATE ON accenture_participantes TO s21_memotest_app;
