import { useCallback, useEffect, useState } from 'react'

import { useAppSelector } from '@/store/hooks'
import { Song } from '@/store/musixmatch/musixmatch.types'
import { isInitialized, selectMusixmatch } from '@/store/musixmatch/selectors'
import { pickRandom, shuffle } from '@/utils/arrays'

interface QuizQuestionLazyTrigger {
  (): void
}
interface QuizQuestion {
  question: string
  answer: string
  possibleAnswers: string[]
}

type UseQuizQuestion = [
  QuizQuestionLazyTrigger,
  QuizQuestion?
]

export default function useQuizQuestion (): UseQuizQuestion {
  const musixmatch = useAppSelector(selectMusixmatch)

  const [question, setQuestion] = useState<QuizQuestion>()

  const trigger = useCallback(() => {
    if (isInitialized(musixmatch)) {
      const song = pickRandom<Song>(musixmatch.songs)
      const possibleAnswers = ([] as Song[])
        .concat(pickRandom(musixmatch.songs, song))
        .concat(pickRandom(musixmatch.songs, song))
        .map(s => s.artist)
        .concat(song.artist)

      shuffle(possibleAnswers)

      setQuestion({
        question: pickRandom(song.lyrics),
        possibleAnswers,
        answer: song.artist
      })
    }
  }, [musixmatch])

  useEffect(() => trigger(), [trigger])

  return [trigger, question]
}
