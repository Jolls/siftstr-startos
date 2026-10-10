import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  // SIFTSTR_BASE_URL: the address the browser and the Claude task reach
  // Siftstr at. Chosen by the user (actions/setBaseUrl.ts); empty until then.
  baseUrl: z.string().catch(''),
  // Flips to true once the admin user exists in Siftstr's database.
  adminCreated: z.boolean().catch(false),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
