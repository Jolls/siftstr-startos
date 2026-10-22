import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.13:0',
  releaseNotes: {
    en_US:
      'Update Siftstr to 0.2.13: daily briefings are now written by a timer instead of the Claude run, item titles link to their Karakeep bookmark, and the day’s Karakeep highlight shows on Today with its color, which you can change',
    es_ES:
      'Actualiza Siftstr a 0.2.13: los resúmenes diarios ahora los escribe un temporizador en lugar de la ejecución de Claude, los títulos de los elementos enlazan a su marcador de Karakeep, y el destacado del día de Karakeep aparece en Hoy con su color, que puedes cambiar',
    de_DE:
      'Aktualisiert Siftstr auf 0.2.13: tägliche Briefings werden jetzt von einem Timer statt vom Claude-Lauf geschrieben, Elementtitel verlinken auf ihr Karakeep-Lesezeichen, und das Karakeep-Highlight des Tages erscheint auf „Heute“ mit seiner Farbe, die du ändern kannst',
    pl_PL:
      'Aktualizuje Siftstr do 0.2.13: dzienne zestawienia zapisuje teraz zegar zamiast uruchomienia Claude, tytuły elementów prowadzą do zakładki w Karakeep, a wyróżnienie Karakeep z danego dnia pojawia się na stronie Dziś wraz z kolorem, który można zmienić',
    fr_FR:
      'Met à jour Siftstr vers 0.2.13 : les récapitulatifs quotidiens sont désormais écrits par un minuteur plutôt que par l’exécution de Claude, les titres des éléments renvoient vers leur favori Karakeep, et le surlignage Karakeep du jour s’affiche sur Aujourd’hui avec sa couleur, que vous pouvez changer',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
