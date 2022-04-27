import { httpClient } from '../http'
import { HttpRoutes } from './routes'
import { Lyrics } from '@/models/lyrics.types'
import { MMResponseType } from '@/models/response.types'
import { Track } from '@/models/track.type'
import { TrackList } from '@/models/tracklist.types'

export const getTopTracks = (
  page_size = 20,
  country = 'it'
) => httpClient.get<MMResponseType<TrackList>>(
  HttpRoutes.ChartTracksGet,
  {
    params: {
      page: 1,
      page_size,
      country,
      f_has_lyrics: 1,
      chart_name: 'top'
    }
  })

export const getLyricsFromTrack = (
  track: Track
) => httpClient.get<MMResponseType<Lyrics>>(
  HttpRoutes.TrackLyricsGet,
  {
    params: {
      track_id: track.track_id,
      commontrack_id: track.commontrack_id
    }
  })
