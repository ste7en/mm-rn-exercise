import { createSlice } from '@reduxjs/toolkit'

import * as leaderboardActions from './actions'
import { Leaderboard } from './leaderboard.types'

const initialState: Leaderboard = {
  scores: []
}

const leaderboardState = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: leaderboardActions
})

export const { savePoints } = leaderboardState.actions

export default leaderboardState.reducer
