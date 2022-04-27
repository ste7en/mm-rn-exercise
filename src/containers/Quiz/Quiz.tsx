import React, { useEffect } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, ButtonGroup, Text } from '@rneui/base'
import { Alert, StyleSheet } from 'react-native'
import Config from 'react-native-config'
import { SafeAreaView } from 'react-native-safe-area-context'

import useQuizQuestion from '@/hooks/useQuizQuestion'
import { Routes } from '@/navigators/routes'
import { QuizStackNavigationProps } from '@/navigators/Stack/navigator.types'
import { gameOver, questionGuessed, questionNotGuessed, selectGameplay } from '@/store/gameplay'
import { isGameStarted } from '@/store/gameplay/selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { savePoints } from '@/store/leaderboard'
import { Score } from '@/store/leaderboard/leaderboard.types'

const { N_TO_WIN: threshold } = Config

export default function QuizScreen (
  { navigation }: NativeStackScreenProps<QuizStackNavigationProps, Routes.QuizScreen>
) {
  const gameplay = useAppSelector(selectGameplay)
  const dispatch = useAppDispatch()
  const [poll, quizQuestion] = useQuizQuestion()

  const [index, setIndex] = React.useState<number>()

  const guess = () => {
    if (index && quizQuestion?.possibleAnswers[index] === quizQuestion?.answer) {
      dispatch(questionGuessed())
      setIndex(undefined)
      Alert.alert('Correct!')
    } else {
      dispatch(questionNotGuessed())
      setIndex(undefined)
      Alert.alert('Wrong!')
    }
    poll()
  }

  useEffect(() => {
    if (isGameStarted(gameplay) && gameplay.guessedInRow >= threshold) {
      const score: Score = {
        userId: gameplay.userId,
        points: gameplay.points,
        timestamp: new Date()
      }
      dispatch(gameOver())
      dispatch(savePoints(score))
    }
  }, [dispatch, gameplay, quizQuestion])

  return (
    <SafeAreaView style={styles.container}>
      <Text h3>{quizQuestion?.question}</Text>

      <ButtonGroup
        buttonContainerStyle={styles.buttonContainer}
        buttons={quizQuestion?.possibleAnswers}
        containerStyle={styles.buttonGroupContainer}
        innerBorderStyle={{ color: 'transparent', width: 0 }}
        onPress={setIndex}
        selectedButtonStyle={styles.selectedButton}
        selectedIndex={index}
        selectedTextStyle={styles.selectedText}
        textStyle={styles.textStyle}
        vertical
      />

      {isGameStarted(gameplay) && (
        <>
          <Text>{'Current game:'}</Text>
          <Text>{`Points: ${gameplay.points}`}</Text>
          <Text>{`Guessed in row: ${gameplay.guessedInRow}`}</Text>
        </>
      )}

      <Button
        buttonStyle={[styles.buttonContainer, { height: 50 }]}
        disabled={!quizQuestion}
        onPress={guess}
        title={'Guess'}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 16
  },
  buttonGroupContainer: {
    marginTop: 50,
    height: 300,
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  buttonContainer: {
    height: 80,
    borderRadius: 18,
    marginVertical: 15,
    backgroundColor: '#3D3D55'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 34,
    color: '#7F8EAB'
  },
  selectedButton: {
    height: 80,
    borderRadius: 18,
    marginVertical: 15,
    backgroundColor: '#3D3D55',
    borderColor: 'white'
  },
  selectedText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 34,
    color: 'white'
  }
})
