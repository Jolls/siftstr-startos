import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.7:0',
  releaseNotes: {
    en_US:
      'Update Siftstr to 0.2.7: connection status checks, Karakeep highlights in the briefing, accent colors and dark mode, a session list with Sign out everywhere, and hardening for public exposure. On an https address everyone signs in once after the update. The Miniflux, Karakeep and MeTube URLs under Settings, Destinations are now pre-filled from the services installed on this server',
    es_ES:
      'Actualiza Siftstr a 0.2.7: comprobación del estado de las conexiones, destacados de Karakeep en el resumen, colores de acento y modo oscuro, una lista de sesiones con Cerrar sesión en todas partes y refuerzo para la exposición pública. En una dirección https todos deben iniciar sesión una vez tras la actualización. Las URL de Miniflux, Karakeep y MeTube en Ajustes, Destinos se rellenan ahora con los servicios instalados en este servidor',
    de_DE:
      'Aktualisiert Siftstr auf 0.2.7: Statusprüfung der Verbindungen, Karakeep-Highlights im Briefing, Akzentfarben und Dunkelmodus, eine Sitzungsliste mit Überall abmelden und Härtung für den öffentlichen Zugriff. Bei einer https-Adresse müssen sich nach dem Update alle einmal neu anmelden. Die URLs von Miniflux, Karakeep und MeTube unter Einstellungen, Ziele werden jetzt aus den auf diesem Server installierten Diensten vorausgefüllt',
    pl_PL:
      'Aktualizuje Siftstr do 0.2.7: sprawdzanie stanu połączeń, wyróżnienia Karakeep w zestawieniu, kolory akcentu i tryb ciemny, lista sesji z opcją Wyloguj wszędzie oraz wzmocnienia pod publiczne udostępnienie. Przy adresie https po aktualizacji wszyscy logują się ponownie jeden raz. Adresy URL Miniflux, Karakeep i MeTube w Ustawieniach, Miejsca docelowe są teraz wstępnie wypełniane na podstawie usług zainstalowanych na tym serwerze',
    fr_FR:
      'Met à jour Siftstr vers 0.2.7 : vérification de l’état des connexions, surlignages Karakeep dans le récapitulatif, couleurs d’accent et mode sombre, liste des sessions avec Se déconnecter partout, et durcissement pour l’exposition publique. Sur une adresse https, chacun se reconnecte une fois après la mise à jour. Les URL de Miniflux, Karakeep et MeTube dans Paramètres, Destinations sont désormais préremplies à partir des services installés sur ce serveur',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
