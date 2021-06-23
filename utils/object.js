const isObjectEmpty = (object) => {
  if (!(typeof object === 'object')) {
    return 'Not object given.'
  }
  return !Object.keys(object).length
}

export { isObjectEmpty }
