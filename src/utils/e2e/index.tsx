import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit'
import { render as rtlRender, RenderAPI, RenderOptions } from '@testing-library/react-native'
import { Provider } from 'react-redux'

import { reducers, RootState } from '@/store'

type Wrapper = {
  children: JSX.Element | null
}
type MockNavigation = {
  navigate: jest.Mock<void, [string, any]>
  reset: jest.Mock<void, any>
  callback: jest.Mock
  addListener: jest.Mock<void, [string, any]>
  goBack: jest.Mock
  setOptions: jest.Mock<void, [string, any]>
  setParams: jest.Mock<void, [string, any]>
  pop: jest.Mock
  dispatch: jest.Mock
}
type WrapperRender<S, A extends AnyAction> = {
  render: RenderAPI
  store: Store<S, A>
  navigation: MockNavigation
}

const DEFAULT_NOCK_HOST = 'http://localhost'

function wrappedRender<S = RootState, A extends AnyAction = AnyAction> (
  ui: JSX.Element,
  {
    preloadedState,
    store = configureStore({
      reducer: reducers,
      preloadedState: preloadedState || {}
    }),
    ...renderOptions
  }: RenderOptions & {preloadedState?: Partial<S>; store?: any} = {},
  params?: Record<string, unknown>,
  callback?: () => void,
  returnCallback?: () => void
): WrapperRender<S, A> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const effect = (callback?: () => void, returnCallback?: () => void) => {
    callback?.()
    if (returnCallback) {
      return () => returnCallback()
    }
  }

  const navigation: MockNavigation = {
    navigate: jest.fn(),
    reset: jest.fn(),
    callback: jest.fn(),
    addListener: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
    pop: jest.fn(),
    dispatch: jest.fn()
  }

  const Wrapper = ({ children }: Wrapper): React.FunctionComponentElement<any> => {
    useEffect(() => effect(callback, returnCallback))
    const childrenWithProps = React.Children.map(children, child => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        // @ts-expect-error - no overload for `navigation`
        return React.cloneElement(child, { navigation, ...params })
      }
      return child
    })

    return (
        <NavigationContainer>
          <Provider store={store}>
            {childrenWithProps}
          </Provider>
        </NavigationContainer>
    )
  }
  return { render: rtlRender(ui, { wrapper: Wrapper, ...renderOptions }), store, navigation }
}

function dbg (cb: () => void): void { (process && process.env.JEST_WORKER_ID) || cb() }
function isDbg (): boolean { return !!(process && process.env.JEST_WORKER_ID) }

export * from '@testing-library/react-native'
export { wrappedRender, DEFAULT_NOCK_HOST, dbg, isDbg }
