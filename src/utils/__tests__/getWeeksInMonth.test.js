import { getWeeksInMonth } from "../getWeeksInMonth";

const expectedWeeks = [
  6, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
]

describe('getWeeksInMonth', () => {
  it.skip('should get correct weeks in month for all months', () => {
    expectedWeeks.forEach((expectedWeekForMonth, month ) => {
      const actual = getWeeksInMonth(2022, month)
      console.log(month)
      expect(actual).toEqual(expectedWeekForMonth)

    })
  })
})
