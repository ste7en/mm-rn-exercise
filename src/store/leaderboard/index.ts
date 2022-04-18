import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { PersistConfig } from 'redux-persist'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import * as leaderboardActions from './actions'
import { Leaderboard } from './leaderboard.types'

const initialState: Leaderboard = {
  scores: []
}

const sliceName = 'leaderboard'

const leaderboardState = createSlice({
  name: sliceName,
  initialState,
  reducers: leaderboardActions
})

export const leaderboardPersistConfig: PersistConfig<Leaderboard> = {
  key: sliceName,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1
}

export const { savePoints } = leaderboardState.actions

export default leaderboardState.reducer
