import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.0:0',
  releaseNotes: {
    en_US:
      'Update Siftstr to 0.2.0: triage on title and excerpt, Delete and archive-after-promote, per-source summary source, and Karakeep as a source. Update the Claude scheduled-task prompt from the upstream docs',
    es_ES:
      'Actualiza Siftstr a 0.2.0: clasificación por título y extracto, Eliminar y archivar tras promover, origen de resumen por fuente y Karakeep como fuente. Actualice el prompt de la tarea programada de Claude desde la documentación de origen',
    de_DE:
      'Aktualisiert Siftstr auf 0.2.0: Triage nach Titel und Auszug, Löschen und Archivieren nach dem Hochstufen, Zusammenfassungsquelle pro Quelle und Karakeep als Quelle. Aktualisieren Sie den Prompt der geplanten Claude-Aufgabe aus der Upstream-Dokumentation',
    pl_PL:
      'Aktualizuje Siftstr do 0.2.0: segregacja według tytułu i fragmentu, Usuń i archiwizacja po awansie, źródło podsumowania per źródło oraz Karakeep jako źródło. Zaktualizuj prompt zaplanowanego zadania Claude z dokumentacji upstream',
    fr_FR:
      'Met à jour Siftstr vers 0.2.0 : tri sur le titre et l’extrait, Supprimer et archiver après promotion, source de résumé par source et Karakeep comme source. Mettez à jour le prompt de la tâche planifiée Claude depuis la documentation upstream',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
