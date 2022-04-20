import { MMClientState, MMInitialized, MMUninitialized } from './musixmatch.types'

export const isUninitialized = (
  state: MMClientState
): state is MMUninitialized => state.status === 'Uninitialized'

export const isInitialized = (
  state: MMClientState
): state is MMInitialized => state.status === 'Initialized'

export const isLoading = (
  state: MMClientState
): boolean => state.isLoading
