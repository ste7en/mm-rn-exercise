import { lyricsArrayCleanup, splitAndCleanLyrics } from '../utils'

describe('musixmatch client utils', () => {
  describe('the lyrics array cleanup', () => {
    describe('given an array of lyrics of more than three items', () => {
      it('should remove the last three items', () => {
        const lyricsArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
        const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        const result = lyricsArrayCleanup(lyricsArray)
        expect(result).toEqual(expected)
        expect(result).not.toBe(lyricsArray)
      })
    })
    describe('given an array of strings', () => {
      it('should remove empty strings, spaces and \'...\'s', () => {
        const lyricsArray = ['a', '', 'c', '', 'e', ' ', 'f', '...', '...', 'g', 'h', 'i', 'j']
        const expected = ['a', 'c', 'e', 'f', 'g']
        const result = lyricsArrayCleanup(lyricsArray)
        expect(result).toEqual(expected)
      })
    })
  })
  describe('the split and clean lyrics', () => {
    describe('given a string of lyrics', () => {
      it('should split the string and remove empty strings, spaces and \'...\'s', () => {
        const lyrics = 'a\n\n\nc\n\n\ne\n\n\nf\n\n\n\n\n\n\ng\nh\ni\nj'
        const expected = ['a', 'c', 'e', 'f', 'g']
        const result = splitAndCleanLyrics(lyrics)
        expect(result).toEqual(expected)
      })
    })
  })
})
