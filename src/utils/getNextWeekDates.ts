export function getNextWeekDates() {
  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const nextWeekDates = [dayOfMonth + (8 - dayOfWeek)];

  for(let i = 1; i < 7; i++) {
    nextWeekDates.push(nextWeekDates[0] + i);
  }

  return  { nextWeekDates, year, month }
}
