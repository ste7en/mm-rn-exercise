import reducer, { addSong, initialize, loadSongs, setError, setIsLoading } from '..'
import { MMClientState, Song } from '../musixmatch.types'

describe('when an initial state', () => {
  const initialState = reducer(undefined, initialize())
  describe('is set as loading', () => {
    const loadingState = reducer(initialState, setIsLoading(true))
    it('should have the loading state set to true', () => {
      expect(loadingState.isLoading).toBe(true)
      expect(loadingState.status).toBe('Uninitialized')
    })
    it('should set the loading state to false', () => {
      expect(reducer(loadingState, setIsLoading(false)).isLoading).toBe(false)
      expect(reducer(loadingState, setIsLoading(false)).status).toBe('Uninitialized')
    })
    it('allows to add a song while loading', () => {
      const state = { isLoading: true, status: 'Initialized', songs: [] } as MMClientState
      expect(reducer(state, addSong({ id: '1', title: 'test' })).songs).toEqual([{ id: '1', title: 'test' }])
    })
    it('allows to initialize the state and add a song', () => {
      const state = { isLoading: true, status: 'Uninitialized' } as MMClientState
      expect(reducer(state, addSong({ id: '1', title: 'test' })).songs).toEqual([{ id: '1', title: 'test' }])
    })
    describe('and an error occurs', () => {
      const state = { status: 'Uninitialized', isLoading: true } as MMClientState
      it('should set the error state', () => {
        expect(reducer(state, setError('Error occurred!')).error).toBeDefined()
      })
      it('should set the loading state to false', () => {
        expect(reducer(state, setError('Error occurred!')).isLoading).toBe(false)
      })
    })
  })
  describe('is set as initialized', () => {
    const initializedState = reducer(initialState, loadSongs([]))
    it('should load a list of songs', () => {
      const songs: Song[] = [
        { id: 1, title: 'Song 1', artist: 'Artist 1', lyrics: ['abcdef ghi'] },
        { id: 2, title: 'Song 2', artist: 'Artist 2', lyrics: ['abcdef ghi'] },
        { id: 3, title: 'Song 3', artist: 'Artist 3', lyrics: ['abcdef ghi'] }
      ]
      expect(reducer(initializedState, loadSongs(songs)).songs).toEqual(songs)
    })
    it('should add a song', () => {
      const song = { id: 4, title: 'Song 4', artist: 'Artist 4', lyrics: ['abcdef ghi'] }
      expect(reducer(initializedState, addSong(song)).songs).toEqual([song])
    })
    it('setting an error should not change the state', () => {
      expect(reducer(initializedState, setError('Error occurred!'))).toStrictEqual(initializedState)
      expect(reducer(initializedState, setError('Error occurred!')).error).toBeUndefined()
    })
  })
})
