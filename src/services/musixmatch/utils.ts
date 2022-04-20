export const lyricsArrayCleanup = (arr: string[]) => {
  /**
   * Removing the last three items in the array,
   * [n-1] with an identifier
   * [n-2] with information on the copyright
   * [n-3] with '...'
   */
  arr.pop()
  arr.pop()
  arr.pop()

  // removing empty strings and '...'s
  return arr.filter(str => !(str === '' || str === ' ' || str === '...'))
}

export const splitAndCleanLyrics = (lyrics: string) => {
  const lyricsArray = lyrics.split('\n')
  return lyricsArrayCleanup(lyricsArray)
}
