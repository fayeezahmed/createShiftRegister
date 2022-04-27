import { getNextWeekDates, calculateNextMonday } from "../getNextWeekDates";

function createExpectedDates(initialDate) {
  const date = new Date(initialDate)
  const weekDates = [new Date(date)]
  for (let i=1; i<7; i++) {
    const tomorrow = date.getDate() + 1
    const newDate = new Date(date.setDate(tomorrow))
    weekDates.push(new Date(newDate))
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
    const expectedDays = createExpectedDates('28 March 2022 UTC');
    const thisWeek =  [21, 22, 23, 24, 25, 26, 27];

    thisWeek.forEach((today) => {
      const todayDate = new Date(`${today} March 2022 UTC`);
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

  it.only("should populate next week's dates for any day this week if this week spans multiple years", () => {
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
    const expectedMonday = new Date('18 April 2022 UTC'); // 18th 04 2022 is a monday
    console.log(today, expectedMonday)
    const actualMonday = calculateNextMonday(today);
    expect(actualMonday).toEqual(expectedMonday);
  });

  it("should calculateMonday's date correctly given it will span multiple years", () => {
    const expectedMonday = '03 January 2022 UTC'; // 18th 04 2022 is a monday
    const actualMonday = calculateNextMonday('27 December 2021 UTC');
    expect(actualMonday).toEqual(expectedMonday);
  });
})
