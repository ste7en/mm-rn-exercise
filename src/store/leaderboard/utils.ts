import dayjs from 'dayjs'

import { Score } from './leaderboard.types'

export const sortByPointsAndTimestampDesc = (s1: Score, s2: Score) => {
  return s2.points - s1.points > 0
    ? 1
    : s2.points - s1.points < 0
      ? -1
      : dayjs(s2.timestamp).isBefore(dayjs(s1.timestamp))
        ? 1
        : -1
}
