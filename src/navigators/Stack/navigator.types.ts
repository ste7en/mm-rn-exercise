import { ParamListBase } from '@react-navigation/native'

import { Routes } from '../routes'

export interface QuizStackNavigationProps extends ParamListBase {
  readonly [Routes.LoginScreen]: undefined
  readonly [Routes.ReadyScreen]: undefined
  readonly [Routes.QuizScreen]: undefined
  readonly [Routes.GameOverScreen]: undefined
}
