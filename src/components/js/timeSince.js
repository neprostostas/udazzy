export function timeSince(date) {

  var seconds = Math.floor((new Date() - new Date(date).getTime()) / 1000);

  var interval = seconds / 31536000;

  if(interval < 0) {
    return 'sent in the future'
  }
  if(interval === 0) {
    return 'sent now'
  }
  if (interval > 1) {
    return "";
  }
  if (interval > 1 && interval < 2) {
    return "more than a year ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}