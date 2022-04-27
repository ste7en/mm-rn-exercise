import { shuffle } from '..'

describe('from an array', () => {
  const elements = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  describe('shuffle', () => {
    it('should return a shuffled array', () => {
      const copy = [...elements]
      const result = shuffle(elements)
      expect(result).not.toBe(copy)
      expect(result.length).toEqual(copy.length)
      expect(result).toEqual(expect.arrayContaining(copy))
    })
  })
})
