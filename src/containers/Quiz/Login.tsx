import React, { useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Input, Text } from '@rneui/base'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { Routes } from '@/navigators/routes'
import { QuizStackNavigationProps } from '@/navigators/Stack/navigator.types'
import { userLogin } from '@/store/gameplay'

export default function LoginScreen (
  { navigation }: NativeStackScreenProps<QuizStackNavigationProps, Routes.LoginScreen>
) {
  const dispatch = useDispatch()

  const [userId, setUserId] = useState<string>()

  const login = () => {
    if (userId) dispatch(userLogin(userId))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center' }}>{'Insert your user id'}</Text>
      <Input
        onChangeText={setUserId}
        onEndEditing={login}
        placeholder='User id'
        shake={() => true}
      />
      <Button disabled={!userId} onPress={login} title='Log in' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 16
  }
})
