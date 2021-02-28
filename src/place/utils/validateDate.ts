export function isBigger(dateOne: Date, dateTwo: Date): boolean {
  if (dateOne.getTime() >= dateTwo.getTime()) return true;

  return false;
}
export function afterToday(dates: Date[]): boolean {
  let result = true;
  dates.forEach((date) => {
    if (
      date.getTime() <=
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ).getTime()
    )
      result = false;
  });
  return result;
}
