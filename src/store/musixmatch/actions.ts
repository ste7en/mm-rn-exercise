import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

import { MMClientState, Song } from './musixmatch.types'
import { isInitialized, isLoading, isUninitialized } from './selectors'

type ActionReducer<T> = CaseReducer<MMClientState, PayloadAction<T>>

export const initialize: ActionReducer<void> = (state) => ({
  status: 'Uninitialized',
  isLoading: false,
  error: undefined
})

export const setIsLoading: ActionReducer<boolean> = (state, action) => {
  if (isUninitialized(state) && !isLoading(state)) {
    return {
      status: 'Uninitialized',
      isLoading: action.payload
    }
  } else {
    return {
      ...state,
      isLoading: action.payload
    }
  }
}

export const setError: ActionReducer<string> = (state, action) => {
  if (isUninitialized(state)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    }
  }
}

export const loadSongs: ActionReducer<Song[]> = (state, action) => {
  return {
    status: 'Initialized',
    isLoading: false,
    songs: action.payload
  }
}

export const addSong: ActionReducer<Song> = (state, action) => {
  if (isInitialized(state)) {
    return {
      ...state,
      songs: [...state.songs, action.payload]
    }
  } else {
    return {
      ...state,
      status: 'Initialized',
      songs: [action.payload]
    }
  }
}
