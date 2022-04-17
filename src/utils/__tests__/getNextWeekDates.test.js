import { getNextWeekDates, calculateNextMonday } from "../getNextWeekDates";


describe("getNextWeekDates", () => {
  it("should populate next week's dates for any day this week", () => {
    const expectedDays =  [18, 19, 20, 21, 22, 23, 24];
    const expectedMonth = 3
    const expectedYear = 2022
    const thisWeek = [11, 12, 13, 14, 15, 16, 17];

    thisWeek.forEach((today) => {
      const todayDate = new Date(2022, 3, today);
      const { nextWeekDates, year, month } = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
      expect(year).toEqual(expectedYear);
      expect(month).toEqual(expectedMonth);
    })
  });

  it("should populate next week's dates for any day this week if they span multiple months", () => {
    const expectedDays = [28, 29, 30, 31, 1, 2, 3];
    const expectedMonth = 2
    const expectedYear = 2022
    const thisWeek =  [21, 22, 23, 24, 25, 26, 27];

    thisWeek.forEach((today) => {
      const todayDate = new Date(2022, 2, today);
      const { nextWeekDates, year, month } = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
      expect(year).toEqual(expectedYear);
      expect(month).toEqual(expectedMonth);
    })
  });

  it.skip("should populate next week's dates for any day this week if next week spans multiple years", () => {
    const expectedDays =  [27, 28, 29, 30, 31, 1, 2];
    const thisWeek = [20, 21, 22, 23, 24, 25, 26];

    thisWeek.forEach((today) => {
      const todayDate = new Date(2021, 11, today);
      const { nextWeekDates, year, month } = getNextWeekDates(todayDate);
      // expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should populate next week's dates for any day this week if this week spans multiple years", () => {
    const expectedDays = [3, 4, 5, 6, 7, 8, 9];
    const thisWeek =  [
      [27,11,2021], [28,11,2021], [29,11,2021], [30,11,2021], [31,11,2021], [1,0,2022], [2,0,2022]
    ];

    thisWeek.forEach((today) => {
      const todayDate = new Date(today[2], today[1], today[0]);
      const { nextWeekDates, year, month } = getNextWeekDates(todayDate);
      expect(nextWeekDates).toEqual(expect.arrayContaining(expectedDays))
    })
  });

  it("should calculateMonday's date correctly given today is Sunday", () => {
    const expectedMonday = 18; // 18th 04 2022 is a monday
    const today = 17;
    const sunday = 0;
    const lastDayOfMonth = 30 // assuming Apr 30th 2022
    const actualMonday = calculateNextMonday(today, sunday, lastDayOfMonth);
    expect(actualMonday).toEqual(expectedMonday);
  });

  it("should calculateMonday's date correctly given it will span multiple years", () => {
    const expectedMonday = 3; // 18th 04 2022 is a monday
    const today = 27;
    const monday = 1;
    const lastDayOfMonth = 31 // assuming Jan 31st 2021
    const actualMonday = calculateNextMonday(today, monday, lastDayOfMonth);
    expect(actualMonday).toEqual(expectedMonday);
  });
})
