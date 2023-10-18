export function dateNowPlusIncrement(n) {
  let date = new Date()
  date.setDate(date.getDate() + n)
  return date
}