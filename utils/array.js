const orderByDate = (array) => {
  if (!(typeof array === 'object')) {
    return 'Not array given'
  }
  return array.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) {
      return -1
    }
    if (a.updatedAt < b.updatedAt) {
      return 1
    }
    return 0
  })
}

export { orderByDate }
