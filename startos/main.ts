import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { peers, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Siftstr!'))

  const baseUrl = (await storeJson.read((s) => s.baseUrl).const(effects)) ?? ''

  // Pre-fill each installed destination's URL. Siftstr re-applies it on every
  // start, and a changed address restarts the service. An absent service gets
  // no variable, and no key is supplied: the user pastes it into Siftstr.
  const peerEnv: Record<string, string> = {}
  for (const peer of peers) {
    const address = await sdk.host
      .getBridgeAddress(effects, {
        packageId: peer.packageId,
        hostId: peer.hostId,
        internalPort: peer.internalPort,
      })
      .const()
    if (address) peerEnv[peer.envVar] = `http://${address}`
  }

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
      env: { SIFTSTR_BASE_URL: baseUrl, ...peerEnv },
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
