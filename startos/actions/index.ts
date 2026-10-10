import { sdk } from '../sdk'
import { setAdminPassword } from './setAdminPassword'
import { setBaseUrl } from './setBaseUrl'
import { showInternalAddresses } from './showInternalAddresses'

export const actions = sdk.Actions.of()
  .addAction(setAdminPassword)
  .addAction(setBaseUrl)
  .addAction(showInternalAddresses)
