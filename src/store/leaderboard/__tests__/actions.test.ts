import { savePoints } from '../actions'
import { Score } from '../leaderboard.types'

describe('leaderboard reducer actions', () => {
  it('should save a new score on savePoints', async () => {
    const scores: Score[] = []
    const payload: Score = { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') }
    const type = 'leaderboard/savePoints'
    expect(savePoints({ scores }, { payload, type })).toEqual({ scores: [payload] })
  })

  it('should keep existing scores on savePoints', async () => {
    const scores: Score[] = [{ userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') }]
    const payload: Score = { userId: 'userId2', points: 20, timestamp: new Date('2019-01-02') }
    const type = 'leaderboard/savePoints'
    expect(savePoints({ scores }, { payload, type })).toEqual({ scores: [payload, ...scores] })
  })

  it('should sort scores on savePoints', async () => {
    const scores: Score[] = [
      { userId: 'userId1', points: 10, timestamp: new Date('2019-01-01') },
      { userId: 'userId1', points: 20, timestamp: new Date('2019-01-01') }
    ]
    const payload: Score = { userId: 'userId2', points: 20, timestamp: new Date('2019-01-02') }
    const type = 'leaderboard/savePoints'
    expect(savePoints({ scores }, { payload, type })).toEqual({ scores: [scores[1], payload, scores[0]] })
  })
})
