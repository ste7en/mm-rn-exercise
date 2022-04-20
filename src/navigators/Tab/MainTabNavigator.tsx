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
      <MainTab.Screen name={'Quiz'} component={QuizStack} key={Routes.QuizStack} />
      <MainTab.Screen name={'User'} component={UserScreen} key={Routes.UserScreen} />
      <MainTab.Screen name={'Leaderboard'} component={LeaderboardScreen} key={Routes.LeaderboardScreen} />
    </MainTab.Navigator>
  )
}
