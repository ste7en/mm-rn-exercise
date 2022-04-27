import nock from 'nock'
import Config from 'react-native-config'

import { loadLyricsForTopSongsAsync } from '../client'
import { HttpRoutes } from '../routes'
import { Lyrics } from '@/models/lyrics.types'
import { MMResponseType } from '@/models/response.types'
import { TrackList } from '@/models/tracklist.types'
import { store } from '@/store'
import { addSong, setError, setIsLoading } from '@/store/musixmatch'
import { DEFAULT_NOCK_HOST } from '@/utils/e2e'

const spyStoreDispatch = jest.spyOn(store, 'dispatch')

describe('when calling the loadLyricsForTopSongsAsync method', () => {
  beforeAll(() => { nock.disableNetConnect() })
  afterAll(() => { nock.enableNetConnect() })

  afterEach(() => spyStoreDispatch.mockClear())
  const topTracksQuery = {
    params: {
      apikey: Config.API_KEY_PARAM_VALUE,
      page: 1,
      page_size: 20,
      country: 'it',
      f_has_lyrics: 1,
      chart_name: 'top'
    }
  }

  it('should dispatch the setIsLoading action with true', async () => {
    await loadLyricsForTopSongsAsync()
    expect(spyStoreDispatch).toHaveBeenCalledWith(setIsLoading(true))
  })

  describe('when the call fails', () => {
    beforeEach(() => {
      nock(DEFAULT_NOCK_HOST).get(HttpRoutes.ChartTracksGet).query(topTracksQuery.params).replyWithError('no top tracks found')
    })
    afterEach(() => expect(nock.isDone()).toBe(true))
    it('should dispatch the setError action', async () => {
      await loadLyricsForTopSongsAsync()
      expect(spyStoreDispatch).toHaveBeenCalledWith(setError('Error loading lyrics: Network Error'))
    })
    it('should dispatch the setIsLoading action with false', async () => {
      await loadLyricsForTopSongsAsync()
      expect(spyStoreDispatch).toHaveBeenCalledWith(setIsLoading(false))
    })
  })

  describe('when the call succeeds', () => {
    describe('and the response is empty', () => {
      beforeEach(() => {
        nock(DEFAULT_NOCK_HOST).get(HttpRoutes.ChartTracksGet).query(topTracksQuery.params).reply(200, {})
      })
      afterEach(() => expect(nock.isDone()).toBe(true))
      it('should dispatch the setError action', async () => {
        try {
          await loadLyricsForTopSongsAsync()
        } catch {}
        expect(spyStoreDispatch).toHaveBeenCalledWith(setError('Error loading lyrics: no top tracks found'))
      })
      it('should dispatch the setIsLoading action with false', async () => {
        await loadLyricsForTopSongsAsync()
        expect(spyStoreDispatch).toHaveBeenCalledWith(setIsLoading(false))
      })
    })

    describe('and the response is not empty', () => {
      const tracks: MMResponseType<TrackList> = {
        message: {
          header: {
            status_code: 200,
            execute_time: 0.0012
          },
          body: {
            track_list: [
              {
                track: {
                  track_id: 1,
                  track_name: 'track name',
                  commontrack_id: 1,
                  artist_id: 2,
                  artist_name: 'artist name'
                }
              }
            ]
          }
        }
      }

      beforeEach(() => {
        nock(DEFAULT_NOCK_HOST).get(HttpRoutes.ChartTracksGet).query(topTracksQuery.params).reply(200, tracks)
      })
      afterEach(() => expect(nock.isDone()).toBe(true))

      describe('for tracks with trackId or commontrackId and track name and artist name', () => {
        const lyrics: MMResponseType<Lyrics> = {
          message: {
            header: {
              status_code: 200,
              execute_time: 0.0012
            },
            body: {
              lyrics: {
                lyrics_id: 1,
                lyrics_body: 'lyrics body\na\n...\nbcd'
              }
            }
          }
        }
        const lyricsParams = {
          apikey: Config.API_KEY_PARAM_VALUE,
          track_id: 1,
          commontrack_id: 1
        }
        afterEach(() => expect(nock.isDone()).toBe(true))

        describe('when lyrics exist', () => {
          beforeEach(() => nock(DEFAULT_NOCK_HOST).get(HttpRoutes.TrackLyricsGet).query(lyricsParams).reply(200, lyrics))

          it('should dispatch the addSong action', async () => {
            await loadLyricsForTopSongsAsync()
            expect(spyStoreDispatch).toHaveBeenCalledWith(addSong({
              id: 1,
              title: 'track name',
              artist: 'artist name',
              lyrics: ['lyrics body']
            }))
          })
        })

        describe('when lyrics do not exist', () => {
          beforeEach(() => nock(DEFAULT_NOCK_HOST).get(HttpRoutes.TrackLyricsGet).query(lyricsParams).reply(200, {}))
          it('should not dispatch the addSong action', async () => {
            await loadLyricsForTopSongsAsync()
            expect(spyStoreDispatch).not.toHaveBeenCalledWith(addSong({
              id: 1,
              title: 'track name',
              artist: 'artist name',
              lyrics: ['lyrics body']
            }))
          })
        })
      })

      it('should dispatch the setIsLoading action with false', async () => {
        await loadLyricsForTopSongsAsync()
        expect(spyStoreDispatch).toHaveBeenCalledWith(setIsLoading(false))
      })
    })
  })
})
