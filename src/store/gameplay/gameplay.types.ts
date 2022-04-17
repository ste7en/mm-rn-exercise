export type GameNotStartedWithoutUser = Readonly<{
  kind: 'GameNotStartedWithoutUser'
}>

export type GameNotStartedWithUser = Readonly<{
  kind: 'GameNotStartedWithUser'
  userId: string
}>

export type GameStarted = Readonly<{
  kind: 'GameStarted'
  userId: string
  points: number
  guessedInRow: number
}>

export type GameOver = Readonly<{
  kind: 'GameOver'
  userId: string
  points: number
}>

export type GameplayState =
  | GameNotStartedWithoutUser
  | GameNotStartedWithUser
  | GameStarted
  | GameOver
