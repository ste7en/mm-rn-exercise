import {
  GameNotStartedWithoutUser,
  GameNotStartedWithUser,
  GameOver,
  GameplayState,
  GameStarted
} from './gameplay.types'

export function isGameNotStartedWithoutUser (
  state: GameplayState
): state is GameNotStartedWithoutUser {
  return state.kind === 'GameNotStartedWithoutUser'
}

export function isGameNotStartedWithUser (
  state: GameplayState
): state is GameNotStartedWithUser {
  return state.kind === 'GameNotStartedWithUser'
}

export function isGameStarted (
  state: GameplayState
): state is GameStarted {
  return state.kind === 'GameStarted'
}

export function isGameOver (
  state: GameplayState
): state is GameOver {
  return state.kind === 'GameOver'
}
