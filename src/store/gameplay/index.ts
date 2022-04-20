import { createSlice } from '@reduxjs/toolkit'

import * as gameplayActions from './actions'
import {
  GameNotStartedWithoutUser,
  GameplayState
} from './gameplay.types'
import { RootState } from '@/store'

export const initialState: GameNotStartedWithoutUser = {
  kind: 'GameNotStartedWithoutUser'
}

export const gameplayState = createSlice({
  name: 'gameplay',
  initialState: initialState as GameplayState,
  reducers: gameplayActions
})

export const {
  userLogin,
  gameStart,
  questionGuessed,
  questionNotGuessed,
  gameOver,
  logout
} = gameplayState.actions

export const selectGameplay = (state: RootState) => state.gameplay as GameplayState

export default gameplayState.reducer
