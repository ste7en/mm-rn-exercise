/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import MainTabNavigator from '@/navigators/Tab/MainTabNavigator'
import { store } from '@/store'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaProvider>
          <MainTabNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App
