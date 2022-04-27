import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'

import { QuizStackNavigationProps } from './navigator.types'
import GameOverScreen from '@/containers/Quiz/GameOver'
import LoginScreen from '@/containers/Quiz/Login'
import QuizScreen from '@/containers/Quiz/Quiz'
import ReadyScreen from '@/containers/Quiz/Ready'
import { Routes } from '@/navigators/routes'
import { selectGameplay } from '@/store/gameplay'
import { isGameNotStartedWithoutUser, isGameNotStartedWithUser, isGameOver } from '@/store/gameplay/selectors'

const QuizStack = createNativeStackNavigator<QuizStackNavigationProps>()

export default function QuizStackNavigator () {
  const gameplay = useSelector(selectGameplay)
  return (
    <QuizStack.Navigator>
      {isGameNotStartedWithoutUser(gameplay)
        ? <QuizStack.Screen component={LoginScreen} key={Routes.LoginScreen} name={'Login'} />
        : (isGameNotStartedWithUser(gameplay)
            ? <QuizStack.Screen component={ReadyScreen} key={Routes.ReadyScreen} name={'Ready'} />
            : (!isGameOver(gameplay)
                ? <QuizStack.Screen component={QuizScreen} key={Routes.QuizScreen} name={'Who Sings?'} />
                : <QuizStack.Screen component={GameOverScreen} key={Routes.GameOverScreen} name={'Game Over'} />
              )
          )
      }
    </QuizStack.Navigator>
  )
}
