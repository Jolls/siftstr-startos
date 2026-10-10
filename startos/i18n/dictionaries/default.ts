export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Siftstr!': 0,
  'Web Interface': 1,
  'Siftstr is ready': 2,
  'Siftstr is not ready': 3,
  // interfaces.ts
  'The Siftstr triage queue, settings, and JSON API': 4,
  // actions/setAdminPassword.ts
  'Set Admin Password': 5,
  'Generate a new random password for the Siftstr admin account. Replaces any existing password.': 6,
  'Replaces the current admin password.': 7,
  'Login Credentials': 8,
  'Use these credentials to sign in.': 9,
  Username: 10,
  Password: 11,
  // actions/setBaseUrl.ts
  'Set Base URL': 12,
  'Choose which of your Siftstr addresses it uses for its own links. The Claude scheduled task and your browser must both be able to reach it.': 13,
  URL: 14,
  // init
  'Create your admin login': 15,
  'Choose the address Siftstr uses for itself': 16,
  'The chosen address is no longer available. Select a new one.': 17,
  // actions/showInternalAddresses.ts
  'Show Internal Addresses': 18,
  'Show the addresses to enter under Settings, Destinations in Siftstr for the Miniflux, Karakeep, and MeTube services installed on this server.': 19,
  'Internal Addresses': 20,
  'Use these addresses to reach other services from Siftstr.': 21,
  'None of Miniflux, Karakeep, or MeTube is installed.': 22,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
