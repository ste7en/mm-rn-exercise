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
      <MainTab.Screen name={Routes.QuizStack} component={QuizStack} />
      <MainTab.Screen name={Routes.UserScreen} component={UserScreen} />
      <MainTab.Screen name={Routes.LeaderboardScreen} component={LeaderboardScreen} />
    </MainTab.Navigator>
  )
}
