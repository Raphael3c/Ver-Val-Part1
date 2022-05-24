export function addMinutes(numOfMinutes: number, date = new Date()) {
  date.setTime(date.getTime() + numOfMinutes * 60 * 1000);
  return date;
}