import { Leaderboard } from './leaderboard.types'
import { RootState } from '@/store'

export const selectLeaderboard = (state: RootState) => state.leaderboard as Leaderboard

export const selectByUserId = (leaderboard: Leaderboard, userId: string) =>
  leaderboard.scores
    .filter(s => s.userId === userId)
