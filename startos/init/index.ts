import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { taskSetBaseUrl } from './taskSetBaseUrl'
import { watchAdminPassword } from './watchAdminPassword'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  actions,
  dependencies,
  taskSetBaseUrl,
  watchAdminPassword,
)

export const uninit = sdk.setupUninit(versionGraph)
