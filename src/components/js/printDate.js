export function printDate(date, smart) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = '' + d.getHours(),
      minute = '' + d.getMinutes();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minute = minute < 10 ? '0'+minute : minute;
  var strTime = hour + ':' + minute + ' ' + ampm;

  if(smart) {
    let dateNow = new Date()
    if(dateNow.getDate() == day) {
      return 'at ' + strTime
    }
    if (dateNow.getDate() - 1 == day) {
      return 'yesterday at ' + strTime
    } else {
      return [year, month, day].join('.') + ' at ' + strTime
    }

  } else {
    return [year, month, day].join('.') + ' (' + strTime + ')'
  }
}
