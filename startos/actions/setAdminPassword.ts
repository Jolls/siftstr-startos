import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { adminUsername } from '../utils'

export const setAdminPassword = sdk.Action.withoutInput(
  // id
  'set-admin-password',

  // metadata
  async ({ effects }) => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Generate a new random password for the Siftstr admin account. Replaces any existing password.',
    ),
    warning: (await storeJson.read((s) => s.adminCreated).const(effects))
      ? i18n('Replaces the current admin password.')
      : null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // handler
  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })
    const created = await storeJson.read((s) => s.adminCreated).once()

    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'siftstr' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: 'data',
        mountpoint: '/data',
        readonly: false,
      }),
      'siftstr-admin',
      (sub) =>
        sub.execFail(
          created
            ? ['/siftstr', 'user', 'set-password', adminUsername]
            : ['/siftstr', 'user', 'add', '--admin', adminUsername],
          { user: 'root', input: password },
        ),
    )

    await storeJson.merge(effects, { adminCreated: true })

    return {
      version: '1' as const,
      title: i18n('Login Credentials'),
      message: i18n('Use these credentials to sign in.'),
      result: {
        type: 'group' as const,
        value: [
          {
            type: 'single' as const,
            name: i18n('Username'),
            description: null,
            value: adminUsername,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single' as const,
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
