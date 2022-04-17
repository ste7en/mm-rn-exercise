import {
  gameOver,
  gameStart,
  logout,
  questionGuessed,
  questionNotGuessed,
  userLogin
} from '../actions'
import { GameplayState } from '../gameplay.types'

describe('gameplay actions', () => {
  const loggedOutState: GameplayState = { kind: 'GameNotStartedWithoutUser' }
  const gameStartedState: GameplayState = { kind: 'GameStarted', userId: 'userId', points: 5, guessedInRow: 3 }

  it('should set a logged user if none exists', async () => {
    const payload = 'userId'
    expect(
      userLogin(loggedOutState, { payload, type: 'userLogin' })
    ).toEqual({
      kind: 'GameNotStartedWithUser',
      userId: payload
    })
  })
  it('should not set a logged user if one exists', async () => {
    const state: GameplayState = { kind: 'GameNotStartedWithUser', userId: 'userId' }
    const payload = 'userId2'
    expect(
      userLogin(state, { payload, type: 'userLogin' })
    ).toBeUndefined()
  })

  it('should start a game for a logged user', async () => {
    const state: GameplayState = { kind: 'GameNotStartedWithUser', userId: 'userId' }
    expect(
      gameStart(state, { type: 'gameStart', payload: undefined })
    ).toEqual({
      kind: 'GameStarted',
      userId: 'userId',
      points: 0,
      guessedInRow: 0
    })
  })
  it('should not start a game for a not logged user', async () => {
    expect(
      gameStart(loggedOutState, { type: 'gameStart', payload: undefined })
    ).toBeUndefined()
  })

  it('increments points for a correct guess', async () => {
    expect(
      questionGuessed(gameStartedState, { type: 'questionGuessed', payload: undefined })
    ).toEqual({
      ...gameStartedState,
      points: gameStartedState.points + 1,
      guessedInRow: gameStartedState.guessedInRow + 1
    })

    expect(
      questionGuessed(loggedOutState, { type: 'questionGuessed', payload: undefined })
    ).toBeUndefined()
  })
  it('resets guessedInRow for a wrong guess', async () => {
    expect(
      questionNotGuessed(gameStartedState, { type: 'questionNotGuessed', payload: undefined })
    ).toEqual({
      ...gameStartedState,
      guessedInRow: 0
    })

    expect(
      questionNotGuessed(loggedOutState, { type: 'questionNotGuessed', payload: undefined })
    ).toBeUndefined()
  })

  it('should end the game', async () => {
    expect(
      gameOver(gameStartedState, { type: 'gameOver', payload: undefined })
    ).toEqual({
      kind: 'GameOver',
      userId: 'userId',
      points: gameStartedState.points
    })

    expect(
      gameOver(loggedOutState, { type: 'gameOver', payload: undefined })
    ).toBeUndefined()
  })

  it('should logout', async () => {
    expect(
      logout(gameStartedState, { type: 'logout', payload: undefined })
    ).toEqual({
      kind: 'GameNotStartedWithoutUser'
    })

    expect(
      logout(loggedOutState, { type: 'logout', payload: undefined })
    ).toBeUndefined()
  })
})
