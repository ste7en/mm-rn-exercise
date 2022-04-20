import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { PersistConfig } from 'redux-persist'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import * as musixmatchActions from './actions'
import { MMClientState } from './musixmatch.types'

const initialState: MMClientState = {
  status: 'Uninitialized',
  isLoading: false
}

const sliceName = 'musixmatch'

const musixmatchState = createSlice({
  name: sliceName,
  initialState: initialState as MMClientState,
  reducers: musixmatchActions
})

export const musixmatchPersistConfig: PersistConfig<MMClientState> = {
  key: sliceName,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1
}

export const {
  initialize,
  setIsLoading,
  setError,
  loadSongs,
  addSong
} = musixmatchState.actions

export default musixmatchState.reducer
