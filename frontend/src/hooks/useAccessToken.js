import { createLocalStorageStateHook } from 'use-local-storage-state'

const useAccessToken = createLocalStorageStateHook('fish-loc-access-token', undefined)

export default useAccessToken