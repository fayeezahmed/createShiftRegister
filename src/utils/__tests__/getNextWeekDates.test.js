import { getNextWeekDates, calculateNextMonday } from "../getNextWeekDates";

function createExpectedDates(initialDate, shouldDst = true) {
  const date = new Date(initialDate)

  const dstOffsetInitial = shouldDst ? dstOffset(date) : date

  const weekDates = [new Date(dstOffsetInitial)]
  for (let i=1; i<7; i++) {
    const tomorrow = date.getDate() + 1
    const newDate = new Date(date.setDate(tomorrow))

    const offset = shouldDst ? dstOffset(newDate) : newDate
    weekDates.push(new Date(offset))
  }

  return weekDates
}

describe("getNextWeekDates", () => {
  it("should populate next week's dates for any day this week", () => {
    const expectedDays = createExpectedDates('18 April 2022 UTC')
    const thisWeek = [11, 12, 13, 14, 15, 16, 17];

    thisWeek.forEach((today) => {
      const todayDate = new Date(`${today} April 2022 UTC`);
      const nextWeekDates = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should populate next week's dates for any day this week if they span multiple months", () => {
    const expectedDays = createExpectedDates('28 March 2022 UTC', false);
    const thisWeek =  [21, 22, 23, 24, 25, 26, 27];

    thisWeek.forEach((today) => {
      const todayDate = new Date(`${today} March 2022 UTC`);
      const nextWeekDates = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should populate next week's dates for any day this week if this week spans multiple month", () => {
    const expectedDays = createExpectedDates('02 May 2022 UTC');
    const thisWeek =  [
      [25,'April',2022], [26,'April',2022], [27,'April',2022], [28,'April',2022], [29,'April',2022], [30,'April',2022], [1,'May',2022]
    ];

    thisWeek.forEach((today) => {
      const date = `${today[0]} ${today[1]} ${today[2]} UTC`
      const todayDate = new Date(date);
      const nextWeekDates = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should populate next week's dates for any day this week if next week spans multiple years", () => {
    const expectedDays =  createExpectedDates('27 December 2021 UTC');
    const thisWeek = [20, 21, 22, 23, 24, 25, 26];

    thisWeek.forEach((today) => {
      const todayDate = new Date(`${today} December 2021 UTC`);
      const nextWeekDates  = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should populate next week's dates for any day this week if this week spans multiple years", () => {
    const expectedDays = createExpectedDates('03 January 2022 UTC');
    const thisWeek =  [
      [27,'December',2021], [28,'December',2021], [29,'December',2021], [30,'December',2021], [31,'December',2021], [1,'January',2022], [2,'January',2022]
    ];

    thisWeek.forEach((today) => {
      const date = `${today[0]} ${today[1]} ${today[2]} UTC`
      const todayDate = new Date(date);
      const nextWeekDates = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should calculateMonday's date correctly given today is Sunday", () => {
    const today = new Date('17 April 2022 UTC');
    const expectedMonday = dstOffset(new Date('18 April 2022 UTC')); // 18th 04 2022 is a monday
    const actualMonday = calculateNextMonday(today);
    expect(actualMonday).toEqual(expectedMonday);
  });

  it("should calculateMonday's date correctly given it will span multiple years", () => {
    const expectedMonday = dstOffset(new Date('03 January 2022 UTC')); // 18th 04 2022 is a monday
    const actualMonday = calculateNextMonday(new Date('27 December 2021 UTC'));
    expect(actualMonday).toEqual(expectedMonday);
  });

  it("should calculateMonday's date correctly given it will span multiple months", () => {
    const expectedMonday = dstOffset(new Date('02 May 2022 UTC')); // 18th 04 2022 is a monday
    const actualMonday = calculateNextMonday(new Date('30 April 2022 UTC'));
    expect(actualMonday).toEqual(expectedMonday);
  });
})


// function createExpectedDates(initialDate) {
//   const date = new Date(initialDate)
//   const initialOffset = dstOffset(date)
//   initialOffset.setTime( initialOffset.getTime() - new Date().getTimezoneOffset()*60*1000 );
// 
//   const weekDates = [new Date(initialOffset)]
//   for (let i=1; i<7; i++) {
//     const tomorrow = date.getDate() + 1
//     const newDate = new Date(date.setDate(tomorrow))
//     
//     const offset = dstOffset(newDate)
//     console.log(offset)
//     weekDates.push(new Date(offset))
//   }
// 
//   return weekDates
// }
// 
function dstOffset(date) {
  const dstOffset = new Date(date);
  dstOffset.setTime( dstOffset.getTime() - new Date().getTimezoneOffset()*60*1000 );
  return dstOffset;
}

