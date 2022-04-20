import React, { useEffect } from 'react'

import { Button, Text } from '@rneui/base'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { loadLyricsForTopSongsAsync } from '@/services/musixmatch/client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { initialize } from '@/store/musixmatch'
import { isInitialized, isLoading, selectMusixmatch } from '@/store/musixmatch/selectors'

export default function ReadyScreen (): JSX.Element {
  const musixmatch = useAppSelector(selectMusixmatch)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isInitialized(musixmatch) && !isLoading(musixmatch)) { loadLyricsForTopSongsAsync() }
  }, [musixmatch])

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
          <Button style={styles.buttons} title={'Play! '}/>
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
