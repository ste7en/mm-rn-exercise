import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

import { Leaderboard, Score } from './leaderboard.types'
import { sortByPointsAndTimestampDesc } from './utils'

type ActionReducer<T> = CaseReducer<Leaderboard, PayloadAction<T>>

export const savePoints: ActionReducer<Score> = (state, action) => {
  const scores = [...state.scores, action.payload]

  scores.sort(sortByPointsAndTimestampDesc)

  return {
    scores
  }
}
