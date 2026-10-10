import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Siftstr!'))

  const baseUrl = (await storeJson.read((s) => s.baseUrl).const(effects)) ?? ''

  // The image is distroless and has no chown, so the daemon runs as root to
  // write the root-owned volume mount.
  return sdk.Daemons.of(effects).addDaemon('siftstr', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'siftstr' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: 'data',
        mountpoint: '/data',
        readonly: false,
      }),
      'siftstr-sub',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      user: 'root',
      env: { SIFTSTR_BASE_URL: baseUrl },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkWebUrl(
          effects,
          `http://127.0.0.1:${uiPort}/healthz`,
          {
            successMessage: i18n('Siftstr is ready'),
            errorMessage: i18n('Siftstr is not ready'),
          },
        ),
    },
    requires: [],
  })
})
