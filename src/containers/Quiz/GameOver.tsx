import React from 'react'

import { Button, Text } from '@rneui/base'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { gameStart, selectGameplay } from '@/store/gameplay'
import { GameOver } from '@/store/gameplay/gameplay.types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export default function GameOverScreen (): JSX.Element {
  const { points } = useAppSelector(selectGameplay) as GameOver
  const dispatch = useAppDispatch()
  return (
    <SafeAreaView style={{ flexGrow: 1, justifyContent: 'space-between', marginHorizontal: 16 }}>
      <View>
        <Text h3 style={{ textAlign: 'center' }}>{'Game Over!'}</Text>
        <Text h4 style={{ textAlign: 'center' }}>{`You scored ${points} points`}</Text>
      </View>

      <Button onPress={() => dispatch(gameStart())} title='Play again' type='outline'/>
    </SafeAreaView>
  )
}
