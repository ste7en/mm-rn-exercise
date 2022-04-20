import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '@/containers/Quiz/Login'
import { Routes } from '@/navigators/routes'

const QuizStack = createNativeStackNavigator()

export default function QuizStackNavigator () {
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen component={LoginScreen} key={Routes.LoginScreen} name={'Login'} />
    </QuizStack.Navigator>
  )
}
