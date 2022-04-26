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

export function calculateNextMonday(today: Date){//, dayOfMonth: number, dayOfWeek: number, lastDayOfMonth: number) {
  // Date.getDay() returns 0 for Sunday, so we enforce 7 instead of 0
  //  for our calculations
  const todayDate = today.getDate();
  const dayOfWeek = 1 + 7 - today.getDay()
  const remainingDays = dayOfWeek % 7 || 7
  const getNextMonday =  todayDate + remainingDays;
  const nextMonday = today.setDate(getNextMonday)

  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const lastDayOfMonth = new Date(year, today.getMonth() +1, 0).getDate()

  return new Date(`${getNextMonday % lastDayOfMonth} ${month} ${year} UTC`);
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
