import { Leaderboard } from './leaderboard.types'
import { RootState } from '@/store'

export const selectLeaderboard = (state: RootState) => state.leaderboard

export const selectByUserId = (leaderboard: Leaderboard, userId: string) =>
  leaderboard.scores
    .filter(s => s.userId === userId)
