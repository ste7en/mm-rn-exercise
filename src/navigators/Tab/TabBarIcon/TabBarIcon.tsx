import React from 'react'

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { Image } from '@rneui/base'
import { ImageSourcePropType } from 'react-native'

// @ts-expect-error Assets module error
import GamePng from '@/assets/game.png'
// @ts-expect-error Assets module error
import LeaderboardPng from '@/assets/leaderboard.png'
// @ts-expect-error Assets module error
import UserPng from '@/assets/user.png'

const TabBarIcon: (src: ImageSourcePropType) => BottomTabNavigationOptions['tabBarIcon'] =
  (src) => function TabIcon ({ focused }: { focused: boolean }) {
    return (
      <Image
        source={src}
        style={{ width: 24, height: 24, tintColor: focused ? 'black' : 'lightgrey' }}
      />
    )
  }

export const QuizIcon = TabBarIcon(GamePng)
export const UserIcon = TabBarIcon(UserPng)
export const LeaderboardIcon = TabBarIcon(LeaderboardPng)
