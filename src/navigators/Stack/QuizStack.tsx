import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'

import { QuizStackNavigationProps } from './navigator.types'
import LoginScreen from '@/containers/Quiz/Login'
import ReadyScreen from '@/containers/Quiz/Ready'
import { Routes } from '@/navigators/routes'
import { selectGameplay } from '@/store/gameplay'
import { isGameNotStartedWithoutUser } from '@/store/gameplay/selectors'

const QuizStack = createNativeStackNavigator<QuizStackNavigationProps>()

export default function QuizStackNavigator () {
  const gameplay = useSelector(selectGameplay)
  return (
    <QuizStack.Navigator>
      {isGameNotStartedWithoutUser(gameplay)
        ? <QuizStack.Screen component={LoginScreen} key={Routes.LoginScreen} name={'Login'} />
        : <QuizStack.Screen component={ReadyScreen} key={Routes.ReadyScreen} name={'Ready'} />
      }
    </QuizStack.Navigator>
  )
}
