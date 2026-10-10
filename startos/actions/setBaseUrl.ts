import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  url: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getNonLocalUrls(effects)

    return {
      name: i18n('URL'),
      values: urls.reduce(
        (obj, url) => ({ ...obj, [url]: url }),
        {} as Record<string, string>,
      ),
      default: '',
    }
  }),
})

export const setBaseUrl = sdk.Action.withInput(
  // id
  'set-base-url',

  // metadata
  async () => ({
    name: i18n('Set Base URL'),
    description: i18n(
      'Choose which of your Siftstr addresses it uses for its own links. The Claude scheduled task and your browser must both be able to reach it.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // pre-fill the input form with the current value
  async () => ({
    url: (await storeJson.read((s) => s.baseUrl).once()) || undefined,
  }),

  // the execution function
  async ({ effects, input }) =>
    storeJson.merge(effects, { baseUrl: input.url }),
)
