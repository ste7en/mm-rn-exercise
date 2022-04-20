import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LeaderboardScreen from '@/containers/Leaderboard/LeaderboardScreen'
import UserScreen from '@/containers/User/UserScreen'
import { Routes } from '@/navigators/routes'
import QuizStack from '@/navigators/Stack/QuizStack'

const MainTab = createBottomTabNavigator()

export default function MainTabNavigator () {
  return (
    <MainTab.Navigator>
      <MainTab.Screen component={QuizStack} key={Routes.QuizStack} name={'Quiz'} />
      <MainTab.Screen component={UserScreen} key={Routes.UserScreen} name={'User'} />
      <MainTab.Screen component={LeaderboardScreen} key={Routes.LeaderboardScreen} name={'Leaderboard'} />
    </MainTab.Navigator>
  )
}
