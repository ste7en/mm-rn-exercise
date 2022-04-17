export type Score = {
  userId: string,
  points: number,
  timestamp: Date
}

export type Leaderboard = Readonly<{
  scores: Score[]
}>
