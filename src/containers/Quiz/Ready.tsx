import React, { useEffect } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text } from '@rneui/base'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Routes } from '@/navigators/routes'
import { QuizStackNavigationProps } from '@/navigators/Stack/navigator.types'
import { loadLyricsForTopSongsAsync } from '@/services/musixmatch/client'
import { gameStart } from '@/store/gameplay'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { initialize } from '@/store/musixmatch'
import { isInitialized, isLoading, selectMusixmatch } from '@/store/musixmatch/selectors'

export default function ReadyScreen (
  { navigation }: NativeStackScreenProps<QuizStackNavigationProps, Routes.QuizScreen>
): JSX.Element {
  const musixmatch = useAppSelector(selectMusixmatch)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isInitialized(musixmatch) && !isLoading(musixmatch)) { loadLyricsForTopSongsAsync() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const play = () => {
    dispatch(gameStart())
  }

  const reload = () => {
    dispatch(initialize())
    loadLyricsForTopSongsAsync()
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isInitialized(musixmatch)
        ? (
        <>
          <Text h4 style={styles.infoText}>Loading...</Text>
        </>)
        : (
        <>
          <Text h4 style={styles.infoText}>Ready!</Text>
          <Button onPress={play} style={styles.buttons} title={'Play!'}/>
          <Button onPress={reload} style={styles.buttons} title={'Reload songs'} type='outline' />
        </>)
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingHorizontal: 16
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 32
  },
  buttons: {
    marginVertical: 8
  }
})
