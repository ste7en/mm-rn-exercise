import allSettled from 'promise.allsettled'

import { getTopTracks, getLyricsFromTrack } from '.'
import { splitAndCleanLyrics } from './utils'
import { store } from '@/store'
import { setIsLoading, setError, addSong } from '@/store/musixmatch'

allSettled.shim()
export async function loadLyricsForTopSongsAsync () {
  store.dispatch(setIsLoading(true))
  try {
    const { data: topTracks } = await getTopTracks()
    if (topTracks.message?.body !== undefined) {
      const { message: { body: trackList } } = topTracks

      await Promise.allSettled(
        trackList
          .track_list
          .filter(({ track: t }) => (t && (t?.track_id || t?.commontrack_id) && t?.track_name && t?.artist_name))
          .map(async ({ track }) => {
            console.log('Downloading for track ', track?.track_name)
            // @ts-expect-error already checked above
            const { data: lyrics } = await getLyricsFromTrack(track)

            if (lyrics.message?.body?.lyrics?.lyrics_body !== undefined) {
              const { lyrics_body: lyricsBody } = lyrics.message.body.lyrics
              const lyricsArray = splitAndCleanLyrics(lyricsBody)

              store.dispatch(addSong({
                // @ts-expect-error already checked above
                id: track.track_id || track.commontrack_id,
                // @ts-expect-error already checked above
                title: track.track_name,
                // @ts-expect-error already checked above
                artist: track.artist_name,
                lyrics: lyricsArray
              }))
            }
          })
      ).then(() => store.dispatch(setIsLoading(false)))
    } else {
      throw new Error('no top tracks found')
    }
  } catch (err: unknown) {
    store.dispatch(setIsLoading(false))
    store.dispatch(setError('Error loading lyrics: ' + (err as Error)?.message))
  }
}
