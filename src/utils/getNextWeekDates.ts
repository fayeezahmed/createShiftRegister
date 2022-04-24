export function getNextWeekDates(currentDate: Date) { 
  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
  const nextWeekDates = [calculateNextMonday(dayOfMonth, dayOfWeek, lastDayOfMonth)];
  
  let newMonthDay = 1;
  for(let i = 1; i < 7; i++) {
    if (nextWeekDates[0] + i > lastDayOfMonth ){
      nextWeekDates.push(newMonthDay++)
    } else {
      nextWeekDates.push(nextWeekDates[0] + i);
    }
  }

  return  { nextWeekDates, year, month }
}

export function calculateNextMonday(dayOfMonth: number, dayOfWeek: number, lastDayOfMonth: number) {
  // Date.getDay() returns 0 for Sunday, so we enforce 7 instead of 0
  //  for our calculations
  const daysOfWeekLeft = 7 - (dayOfWeek || 7)
  // Mod against last day of month in cases where next week spans multiple months
  const nextMonday = (dayOfMonth + daysOfWeekLeft + 1) % lastDayOfMonth
  return nextMonday;
}

function getCurrentDates(currentDate: Date) {
  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return { dayOfWeek, dayOfMonth, month, year }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
