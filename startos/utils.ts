import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 8080

export const uiMultiHostId = 'ui'
export const uiInterfaceId = 'ui'

export const adminUsername = 'admin'

// Services Siftstr can use as destinations. `envVar` is the Siftstr variable
// that pre-fills the connection's URL.
export const peers = [
  {
    name: 'Miniflux',
    envVar: 'SIFTSTR_MINIFLUX_URL',
    packageId: 'miniflux',
    hostId: 'ui',
    internalPort: 8080,
  },
  {
    name: 'Karakeep',
    envVar: 'SIFTSTR_KARAKEEP_URL',
    packageId: 'karakeep',
    hostId: 'ui',
    internalPort: 3000,
  },
  {
    name: 'MeTube',
    envVar: 'SIFTSTR_METUBE_URL',
    packageId: 'metube',
    hostId: 'ui-multi',
    internalPort: 8081,
  },
]

export function getNonLocalUrls(effects: T.Effects): Promise<string[]> {
  return sdk.host
    .getOwn(effects, uiMultiHostId, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === uiInterfaceId)
      return iface ? iface.addressInfo.nonLocal.format() : []
    })
    .const()
}
