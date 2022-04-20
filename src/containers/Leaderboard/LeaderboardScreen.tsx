import React from 'react'

import { Routes } from '@navigators/routes'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/native'
import { Text } from '@rneui/base'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import leaderboardRenderer from './leaderboardRenderer'
import { selectLeaderboard } from '@/store/leaderboard/selectors'

export default function LeaderboardScreen (
  { navigation, route }: Partial<BottomTabScreenProps<ParamListBase, Routes.LeaderboardScreen>>
): JSX.Element {
  const leaderboard = useSelector(selectLeaderboard)

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {leaderboard.scores.length === 0
        ? (<Text>{'No scores available'}</Text>)
        : (
            <FlatList
              data={leaderboard.scores}
              renderItem={leaderboardRenderer}
              testID='leaderboard-list'
            />
          )
      }
    </SafeAreaView>
  )
}
