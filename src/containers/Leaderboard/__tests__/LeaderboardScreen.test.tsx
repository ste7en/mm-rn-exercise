import React from 'react'

import dayjs from 'dayjs'

import LeaderboardScreen from '../LeaderboardScreen'
import { Leaderboard } from '@/store/leaderboard/leaderboard.types'
import { wrappedRender } from '@/utils/e2e'

const mockLeaderboard: Leaderboard = {
  scores: [
    { userId: Math.random().toString(), points: Math.random(), timestamp: new Date() },
    { userId: Math.random().toString(), points: Math.random(), timestamp: new Date() },
    { userId: Math.random().toString(), points: Math.random(), timestamp: new Date() },
    { userId: Math.random().toString(), points: Math.random(), timestamp: new Date() },
    { userId: Math.random().toString(), points: Math.random(), timestamp: new Date() }
  ]
}
const preloadedState = { leaderboard: mockLeaderboard }
const dateFormat = 'DD/MM/YYYY HH:mm:ss'

describe('Leaderboard screen', () => {
  it('should render a list when there are scores in the leaderboard state', async () => {
    const { render: { queryByText, queryByTestId } } = wrappedRender(<LeaderboardScreen />, { preloadedState })
    expect(queryByText('No scores available')).toBeNull()
    expect(queryByTestId('leaderboard-list')).not.toBeNull()
  })

  it.each(
    mockLeaderboard.scores.map(score => [score.userId, score.points, score.timestamp])
  )('should contain the score of user %s with %s points of date %s', async (userId, points, timestamp) => {
    const { render: { queryByText, queryAllByText } } = wrappedRender(<LeaderboardScreen />, { preloadedState })
    expect(queryByText(userId as string)).not.toBeNull()
    expect(queryByText(points.toString())).not.toBeNull()
    expect(queryAllByText(dayjs(timestamp).format(dateFormat))).not.toBeNull()
  })

  it('should render a message when there are no scores in the leaderboard state', async () => {
    const { render: { queryByText, queryByTestId } } = wrappedRender(<LeaderboardScreen />)
    expect(queryByText('No scores available')).not.toBeNull()
    expect(queryByTestId('leaderboard-list')).toBeNull()
  })
})
