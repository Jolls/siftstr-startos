import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { peers } from '../utils'

export const showInternalAddresses = sdk.Action.withoutInput(
  // id
  'show-internal-addresses',

  // metadata
  async () => ({
    name: i18n('Show Internal Addresses'),
    description: i18n(
      'Show the addresses to enter under Settings, Destinations in Siftstr for the Miniflux, Karakeep, and MeTube services installed on this server.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // handler
  async ({ effects }) => {
    const found = await Promise.all(
      peers.map(async (peer) => ({
        name: peer.name,
        address: await sdk.host
          .getBridgeAddress(effects, {
            packageId: peer.packageId,
            hostId: peer.hostId,
            internalPort: peer.internalPort,
          })
          .once(),
      })),
    )

    const installed = found.filter((f) => f.address)

    return {
      version: '1' as const,
      title: i18n('Internal Addresses'),
      message: installed.length
        ? i18n('Use these addresses to reach other services from Siftstr.')
        : i18n('None of Miniflux, Karakeep, or MeTube is installed.'),
      result: {
        type: 'group' as const,
        value: installed.map((f) => ({
          type: 'single' as const,
          name: f.name,
          description: null,
          value: `http://${f.address}`,
          masked: false,
          copyable: true,
          qr: false,
        })),
      },
    }
  },
)
