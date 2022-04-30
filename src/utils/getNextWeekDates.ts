export function getNextWeekDates(currentDate: Date) { 
  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  let month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const nextWeekDates = [calculateNextMonday(currentDate)];
  
  const mondayCopy = new Date(nextWeekDates[0])

  for (let i=1; i<7; i++) {
    const tomorrow = mondayCopy.getDate() + 1
    const newDate = new Date(mondayCopy.setDate(tomorrow))
    nextWeekDates.push(new Date(newDate))
  }

  return nextWeekDates
}

// function addDays(date, days) {
//   var result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// }

export function calculateNextMonday(today: Date){//, dayOfMonth: number, dayOfWeek: number, lastDayOfMonth: number) {
  const todayDate = new Date(today);
  const dayOfWeek = 1 + 7 - today.getDay()
  const remainingDays = dayOfWeek % 7 || 7
  
  todayDate.setDate(todayDate.getDate() + remainingDays);


  // https://stackoverflow.com/questions/32469269/javascript-date-give-wrong-date-off-by-one-hour
  const dstOffset = new Date(todayDate);
  dstOffset.setTime( dstOffset.getTime() - new Date().getTimezoneOffset()*60*1000 );

  return new Date(dstOffset);
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
