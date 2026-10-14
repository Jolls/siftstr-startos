import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.10:0',
  releaseNotes: {
    en_US:
      'Update Siftstr to 0.2.10: a new Briefings page lists past daily briefings to view or download, Old Sifting brings your oldest unarchived Karakeep bookmarks into the Backlog each day, saving a setting now starts the matching fetch right away, the day’s Karakeep highlight now reaches the briefing file even when it is picked after the file was written, and the bottom-up phone view keeps the next card where the last one was',
    es_ES:
      'Actualiza Siftstr a 0.2.10: una nueva página Resúmenes lista los resúmenes diarios anteriores para verlos o descargarlos, Old Sifting trae cada día tus marcadores de Karakeep sin archivar más antiguos a la lista pendiente, al guardar un ajuste la descarga correspondiente empieza de inmediato, el destacado del día de Karakeep ya llega al archivo del resumen aunque se elija después de escribirlo, y la vista móvil de abajo hacia arriba mantiene la siguiente tarjeta donde estaba la anterior',
    de_DE:
      'Aktualisiert Siftstr auf 0.2.10: eine neue Seite „Briefings“ listet frühere Tagesbriefings zum Ansehen oder Herunterladen auf, Old Sifting holt täglich deine ältesten nicht archivierten Karakeep-Lesezeichen in den Rückstand, das Speichern einer Einstellung startet den passenden Abruf jetzt sofort, das Karakeep-Highlight des Tages gelangt jetzt auch dann in die Briefing-Datei, wenn es erst nach dem Schreiben der Datei gewählt wird, und die Ansicht von unten nach oben auf dem Handy hält die nächste Karte an der Stelle der vorherigen',
    pl_PL:
      'Aktualizuje Siftstr do 0.2.10: nowa strona Zestawienia wyświetla dawne dzienne zestawienia do obejrzenia lub pobrania, Old Sifting codziennie dodaje do zaległości najstarsze niezarchiwizowane zakładki Karakeep, zapisanie ustawienia od razu uruchamia odpowiednie pobieranie, wyróżnienie Karakeep z danego dnia trafia teraz do pliku zestawienia także wtedy, gdy zostało wybrane po jego zapisaniu, a widok od dołu do góry na telefonie utrzymuje następną kartę w miejscu poprzedniej',
    fr_FR:
      'Met à jour Siftstr vers 0.2.10 : une nouvelle page Récapitulatifs liste les récapitulatifs quotidiens passés à consulter ou à télécharger, Old Sifting ajoute chaque jour au retard vos plus anciens favoris Karakeep non archivés, l’enregistrement d’un réglage lance désormais aussitôt la récupération correspondante, le surlignage Karakeep du jour arrive maintenant dans le fichier du récapitulatif même s’il est choisi après l’écriture du fichier, et la vue de bas en haut sur mobile garde la carte suivante à la place de la précédente',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
