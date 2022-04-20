import React from 'react'

import { Text } from '@rneui/base'
import { Score } from '@store/leaderboard/leaderboard.types'
import dayjs from 'dayjs'
import { ListRenderItemInfo, View, StyleSheet } from 'react-native'

export default function leaderboardRenderer (
  { item, index }: ListRenderItemInfo<Score>
): JSX.Element {
  return (
    <View key={index} style={styles.cardContainer}>
      <Text h3 style={styles.points}>
        {item.points}
      </Text>
      <View>
        <Text h4>{item.userId}</Text>
        <Text>
          {dayjs(item.timestamp).format('DD/MM/YYYY HH:mm:ss')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row'
  },
  points: {
    alignSelf: 'center',
    marginRight: 16
  }
})
