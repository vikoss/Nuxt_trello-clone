import capitalize from '~/utils/capitalize'

const timestampToDateString = (timestamp) => {
  const dateObject = new Date(timestamp * 1000)
  const dateToString = dateObject.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
  const dateToTime = `${dateObject.getHours()}:${dateObject.getMinutes()}`
  return `${capitalize(dateToString)} a las ${dateToTime}`
}

/* const timestampToHours = (timestamp) => {
  const dateObject = new Date(timestamp * 1000)
  return `${dateObject.getHours()}:${dateObject.getMinutes()}`
} */

export { timestampToDateString }
