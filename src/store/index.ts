import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import createDebugger from 'redux-flipper'
import { persistReducer, persistStore } from 'redux-persist'

import leaderboard, { leaderboardPersistConfig } from './leaderboard'

const reducers = combineReducers({
  leaderboard: persistReducer(leaderboardPersistConfig, leaderboard)
})

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware()

  if (__DEV__ && !process.env.JEST_WORKER_ID) {
    middlewares.push(createDebugger())
  }

  return middlewares
}

const store = configureStore({
  devTools: !!__DEV__,
  middleware,
  reducer: reducers
})

const persistor = persistStore(store)

export { store, persistor, reducers }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
