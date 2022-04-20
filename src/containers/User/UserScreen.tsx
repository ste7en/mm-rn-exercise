import React from 'react'

import { Text } from '@rneui/base'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import leaderboardRenderer from '../utils/leaderboardRenderer'
import { selectGameplay } from '@/store/gameplay'
import { isGameNotStartedWithoutUser } from '@/store/gameplay/selectors'
import { selectByUserId, selectLeaderboard } from '@/store/leaderboard/selectors'

export default function UserScreen (): JSX.Element {
  const gameplay = useSelector(selectGameplay)
  const leaderboard = useSelector(selectLeaderboard)

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {isGameNotStartedWithoutUser(gameplay) && (
        <Text h4 style={styles.placeholderText}>{'Please log in to view your profile'}</Text>
      )}

      {!isGameNotStartedWithoutUser(gameplay) && (
        <>
          <Text h4 style={styles.placeholderText}>{gameplay.userId}</Text>
          <FlatList
            data={selectByUserId(leaderboard, gameplay.userId)}
            renderItem={leaderboardRenderer}
          />
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  placeholderText: {
    textAlign: 'center',
    marginBottom: 16
  }
})
