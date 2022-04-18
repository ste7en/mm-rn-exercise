import { RootState } from '@store'

import { Score } from '../leaderboard.types'
import { selectByUserId, selectLeaderboard } from '../selectors'

describe('leaderboard selectors', () => {
  it('should select leaderboard', () => {
    const state: Partial<RootState> = {
      leaderboard: {
        scores: [
          { userId: 'userId2', points: 20, timestamp: new Date('2020-01-02') },
          { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') },
          { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') }
        ]
      }
    }
    expect(selectLeaderboard(state)).toEqual(state.leaderboard)
  })

  it('should select leaderboard by userId', () => {
    const userId1Scores = [
      { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') },
      { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') },
      { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') }
    ]
    const scores: Score[] = [
      ...userId1Scores,
      { userId: 'userId2', points: 20, timestamp: new Date('2020-01-02') },
      { userId: 'userId4', points: 10, timestamp: new Date('2019-01-01') },
      { userId: 'userId3', points: 10, timestamp: new Date('2019-01-01') }
    ]
    expect(selectByUserId({ scores }, 'userId1')).toEqual(userId1Scores)
  })
})
