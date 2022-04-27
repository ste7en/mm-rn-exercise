import { pickRandom } from '..'

describe('from an array', () => {
  const elements = Array.from({ length: 10 }, () => Math.random() * 10)
  describe('pickRandom', () => {
    describe('excluding an element', () => {
      it('should return a random element from the array', () => {
        const exclude = elements[Math.floor(elements.length * Math.random())]
        const result = pickRandom(elements, exclude)
        expect(result).not.toBe(exclude)
        expect(elements).toContain(result)
      })
    })
    describe('without excluding an element', () => {
      it('should return a random element from the array', () => {
        const result = pickRandom(elements)
        expect(result).not.toBe(undefined)
        expect(elements).toContain(result)
      })
    })
  })
})
