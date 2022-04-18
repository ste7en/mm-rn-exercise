import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

import { GameplayState } from './gameplay.types'
import {
  isGameNotStartedWithoutUser,
  isGameNotStartedWithUser,
  isGameOver,
  isGameStarted
} from './selectors'

type ActionReducer<T> = CaseReducer<GameplayState, PayloadAction<T>>

export const userLogin: ActionReducer<string> = (state, action) => {
  if (isGameNotStartedWithoutUser(state)) {
    return {
      kind: 'GameNotStartedWithUser',
      userId: action.payload
    }
  }
}

export const gameStart: ActionReducer<void> = (state) => {
  if (isGameNotStartedWithUser(state) || isGameOver(state)) {
    return {
      ...state,
      kind: 'GameStarted',
      points: 0,
      guessedInRow: 0
    }
  }
}

export const questionGuessed: ActionReducer<void> = (state) => {
  if (isGameStarted(state)) {
    return {
      ...state,
      points: state.points + 1,
      guessedInRow: state.guessedInRow + 1
    }
  }
}

export const questionNotGuessed: ActionReducer<void> = (state) => {
  if (isGameStarted(state)) {
    return {
      ...state,
      guessedInRow: 0
    }
  }
}

export const gameOver: ActionReducer<void> = (state) => {
  if (isGameStarted(state)) {
    const { guessedInRow, ...rest } = state
    return {
      ...rest,
      kind: 'GameOver'
    }
  }
}

export const logout: ActionReducer<void> = (state) => {
  if (!isGameNotStartedWithoutUser(state)) {
    return {
      kind: 'GameNotStartedWithoutUser'
    }
  }
}
