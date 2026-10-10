import { setAdminPassword } from '../actions/setAdminPassword'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchAdminPassword = sdk.setupOnInit(async (effects) => {
  const created = await storeJson.read((s) => s.adminCreated).const(effects)

  if (!created) {
    await sdk.action.createOwnTask(effects, setAdminPassword, 'critical', {
      reason: i18n('Create your admin login'),
    })
  }
})
