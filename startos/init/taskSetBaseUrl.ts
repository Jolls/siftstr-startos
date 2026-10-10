import { setBaseUrl } from '../actions/setBaseUrl'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../utils'

export const taskSetBaseUrl = sdk.setupOnInit(async (effects) => {
  const baseUrl = await storeJson.read((s) => s.baseUrl).const(effects)
  const availableUrls = await getNonLocalUrls(effects)

  if (!baseUrl) {
    await sdk.action.createOwnTask(effects, setBaseUrl, 'critical', {
      reason: i18n('Choose the address Siftstr uses for itself'),
    })
  } else if (!availableUrls.includes(baseUrl)) {
    await sdk.action.createOwnTask(effects, setBaseUrl, 'critical', {
      reason: i18n(
        'The chosen address is no longer available. Select a new one.',
      ),
    })
  }
})
