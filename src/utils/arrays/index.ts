export const pickRandom = <T = unknown>(arr: T[], exclude?: T) => {
  arr = arr.filter(element => element !== exclude)
  const length = arr.length
  const randomIndex = Math.floor(Math.random() * length)
  return arr[randomIndex]
}

export const shuffle = <T = unknown>(arr: T[]) => {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * length)
    const temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}
