import { RootState } from '@store'

import { Leaderboard } from './leaderboard.types'

export const selectLeaderboard = (state: RootState) => state.leaderboard

export const selectByUserId = (leaderboard: Leaderboard, userId: string) =>
  leaderboard.scores
    .filter(s => s.userId === userId)
