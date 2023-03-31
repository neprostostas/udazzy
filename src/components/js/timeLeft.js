export function timeLeft(time) {
  let time_now = new Date()
  let time_input = new Date(time)
  if (time_input > time_now) {
    let time_sec = (time_input - time_now) / 1000
    let d = parseInt(time_sec / 60 / 60 / 24)
    let h = parseInt(time_sec / 60 / 60 % 24)
    let m = parseInt(time_sec / 60 % 60)

    if (d > 0)
      return d + ' d'
    else if (h > 0)
      return h + ' h'
    else if (m > 0)
      return m + ' m'

  } else {
    return '-'
  }
}
