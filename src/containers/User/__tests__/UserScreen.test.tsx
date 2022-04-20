import React from 'react'

import dayjs from 'dayjs'

import UserScreen from '../UserScreen'
import { RootState } from '@/store'
import { GameplayState } from '@/store/gameplay/gameplay.types'
import { Leaderboard } from '@/store/leaderboard/leaderboard.types'
import { selectByUserId } from '@/store/leaderboard/selectors'
import { wrappedRender } from '@/utils/e2e'

const leaderboard: Leaderboard = {
  scores: [
    { userId: 'another_user_2', points: Math.random(), timestamp: new Date() },
    { userId: 'test_user', points: Math.random(), timestamp: new Date() },
    { userId: 'another_user_1', points: Math.random(), timestamp: new Date() },
    { userId: 'test_user', points: Math.random(), timestamp: new Date() },
    { userId: 'test_user', points: Math.random(), timestamp: new Date() }
  ]
}
const gameplay: GameplayState = {
  kind: 'GameNotStartedWithUser',
  userId: 'test_user'
}
const preloadedState: RootState = {
  leaderboard,
  gameplay
}
const dateFormat = 'DD/MM/YYYY HH:mm:ss'

describe('UserScreen tests', () => {
  it('should render a placeholder if no user is logged in', async () => {
    const { render: { queryByText } } = wrappedRender(<UserScreen />)
    expect(queryByText('Please log in to view your profile')).not.toBeNull()
  })

  it('should render the user profile if a user is logged in', async () => {
    const { render: { queryAllByText } } = wrappedRender(<UserScreen />, { preloadedState })
    expect(queryAllByText('test_user')).not.toBeNull()
    expect(queryAllByText('test_user')).not.toBe([])
    expect(queryAllByText('another_user_1')).toStrictEqual([])
    expect(queryAllByText('another_user_2')).toStrictEqual([])
  })

  it('should show the user\'s score with timestamp', async () => {
    const points = selectByUserId(leaderboard, 'test_user')
    const { render: { queryByText, queryAllByText } } = wrappedRender(<UserScreen />, { preloadedState })
    points.forEach(score => {
      expect(queryByText(score.points.toString())).not.toBeNull()
      expect(queryAllByText(dayjs(score.timestamp).format(dateFormat))).not.toBe([])
    })
  })
})
