import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@store'

import * as gameplayActions from './actions'
import {
  GameNotStartedWithoutUser,
  GameplayState
} from './gameplay.types'

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

export const selectGameplay = (state: RootState) => state.gameplay

export default gameplayState.reducer
