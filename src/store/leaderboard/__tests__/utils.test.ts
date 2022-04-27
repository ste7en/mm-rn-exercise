import { Score } from '../leaderboard.types'
import { sortByPointsAndTimestampDesc } from '../utils'

describe('leaderboard utils', () => {
  describe('sort by points and timestamp desc', () => {
    it('should sort by points desc', async () => {
      const s1: Score = {
        userId: 'userId1',
        points: 10,
        timestamp: new Date('2019-01-01')
      }
      const s2: Score = {
        userId: 'userId2',
        points: 20,
        timestamp: new Date('2020-01-02')
      }

      expect(sortByPointsAndTimestampDesc(s1, s2)).toBeGreaterThan(0)
      expect(sortByPointsAndTimestampDesc(s2, s1)).toBeLessThan(0)
    })

    it('should sort by timestamp asc when points are equal', async () => {
      const s1: Score = {
        userId: 'userId1',
        points: 10,
        timestamp: new Date('2019-01-01')
      }
      const s2: Score = {
        userId: 'userId2',
        points: 10,
        timestamp: new Date('2020-01-02')
      }

      expect(sortByPointsAndTimestampDesc(s1, s2)).toBeLessThan(0)
      expect(sortByPointsAndTimestampDesc(s2, s1)).toBeGreaterThan(0)
    })

    it('should sort an array of scores by points desc and timestamp asc', async () => {
      const s5: Score = { userId: '5', points: 10, timestamp: new Date() }
      const s4: Score = { userId: '4', points: 20, timestamp: new Date() }
      const s3: Score = { userId: '3', points: 10, timestamp: new Date() }
      const s2: Score = { userId: '2', points: 5, timestamp: new Date() }
      const s1: Score = { userId: '1', points: 10, timestamp: new Date() }

      expect([s1, s2, s3, s5, s4].sort(sortByPointsAndTimestampDesc)).toEqual([s4, s5, s3, s1, s2])
    })
  })
})
