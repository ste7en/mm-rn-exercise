export type Song = Readonly<{
  id: number,
  title: string,
  artist: string,
  lyrics: string[]
}>

export type MMUninitialized = Readonly<{
  status: 'Uninitialized',
  isLoading: boolean,
  error?: string
}>

export type MMInitialized = Readonly<{
  status: 'Initialized',
  isLoading: boolean,
  songs: Song[]
}>

export type MMClientState = MMUninitialized | MMInitialized
