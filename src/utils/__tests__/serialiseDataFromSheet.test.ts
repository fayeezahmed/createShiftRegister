import serialiseDataFromSheet from '../serialiseDataFromSheet';

import { expect, it, describe } from 'vitest'
const testData = [
  ["Yosra", "Monday", "active", ""],
  ["Murtaza Chaudhary", "Tuesday,Wednesday,Sunday", "active", ""],
  ["Fayeez", "Monday,Saturday", "absence", "Leave of absence until after Ramadan"],
  ["Abdul-Aleem", "Friday", "inactive", "Removed from shift. Ensure they're hidden/removed from main schedule"],
  ["Sami Al Saleh", "Friday,Saturday,Sunday,Monday,Tuesday,Wednesday,Thursday", "active", ""],
  ["Salman Hassan", "", "adhoc", "Will do shifts when can. Removed from schedule and register."]
]


const expectedObject = {
  Monday:[
    {
      name: "Yosra",
      status: "active",
      notes: ""
    },
    {
      name: "Fayeez",
      status: "absence",
      notes: "Leave of absence until after Ramadan",
    },
    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    }
  ],
  Tuesday:[
    {
      name: "Murtaza Chaudhary",
      status: "active",
      notes: ""
    },
    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    },
  ],
  Wednesday:[
    {
      name: "Murtaza Chaudhary",
      status: "active",
      notes: ""
    },
    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    },
  ],
  Thursday:[

    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    },
  ],
  Friday:[
    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    },
  ],
  Saturday:[
    {
      name: "Fayeez",
      status: "absence",
      notes: "Leave of absence until after Ramadan",
    },
    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    },
  ],
  Sunday:[
    {
      name: "Murtaza Chaudhary",
      status: "active",
      notes: ""
    },
    {
      name: "Sami Al Saleh",
      status: "active",
      notes: ""
    },
  ],
  Adhoc: [
    {
      name: "Salman Hassan",
      status: "adhoc",
      notes: "Will do shifts when can. Removed from schedule and register."
    }
  ]
}

describe('serialiseDataFromSheet', () => {
  it('should generate the correct object from the input data for active members with 1 day', () => {
    const output = serialiseDataFromSheet(testData);
    expect(output["Monday"][0].name).toEqual("Yosra")
    expect(output["Monday"][0].status).toEqual("active")
    expect(output["Monday"][0].notes).toEqual("")
  }),

  it('should generate the correct object from the input data for active members with multiple days', () => {
    const output = serialiseDataFromSheet(testData);

    ["Tuesday", "Wednesday", "Sunday"].forEach(day => {
      expect(output[day][0].name).toEqual("Murtaza Chaudhary")
      expect(output[day][0].status).toEqual("active")
      expect(output[day][0].notes).toEqual("")
    })
  })
  it('should output chat agents who are absent correctly', () => {
    const output = serialiseDataFromSheet(testData);

    [["Monday", 1], ["Saturday", 0]].forEach(dayAndIndex => {
      const [day, index] = dayAndIndex;

      expect(output[day][index].name).toEqual("Fayeez")
      expect(output[day][index].status).toEqual("absence")
      expect(output[day][index].notes).toEqual("Leave of absence until after Ramadan")
    })
  })
  it('should not output those who are inactive', () => {
    const output = serialiseDataFromSheet(testData);
    const days = Object.keys(output).forEach(day => {
      output[day].forEach(chatAgent => {
        expect(chatAgent.name).not.toEqual("Abdul-Aleem")
      })
    })
  })
  it('should put Sami Al Saleh in every day', () => {
    const output = serialiseDataFromSheet(testData);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    daysOfWeek.forEach(day => {
      const lastItem = output[day].length - 1

      expect(output[day][lastItem].name).toEqual("Sami Al Saleh")
      expect(output[day][lastItem].status).toEqual("active")
      expect(output[day][lastItem].notes).toEqual("")
    })

  }),

  it('should populate Adhoc day if a chat agent is doing adhoc shifts', () => {
    const output = serialiseDataFromSheet(testData);
    expect(output["Adhoc"][0].name).toEqual("Salman Hassan")
    expect(output["Adhoc"][0].status).toEqual("adhoc")
    expect(output["Adhoc"][0].notes).toEqual("Will do shifts when can. Removed from schedule and register.")

  })

  it('should throw warning if status is empty', () => {
    const originalWarn = console.warn

    let consoleOutput:Array<string> = []
    const mockedWarn = (message?: any) => {consoleOutput.push(message)}
    console.warn = mockedWarn
    const noStatus = ["Hassan Ahmed", "", "", ""]

    const output = serialiseDataFromSheet([ ...testData, noStatus ]);
    expect(consoleOutput).toEqual([
        'Hassan Ahmed has no status specified. Please specify a status!',
    ])
    console.warn = originalWarn
  })

  it('should throw warning if no day specified and status is empty, active or absent', () => {
    const originalWarn = console.warn

    let consoleOutput:Array<string> = []
    const mockedWarn = (message?: any) => {consoleOutput.push(message)}
    console.warn = mockedWarn

    const statusAndNoDay = [ 
      ["Amir Aziz", "", "active", ""],
      ["Ibrahim Khan", "", "absence", ""]
    ]
    const output = serialiseDataFromSheet([ ...testData, ...statusAndNoDay ]);
    expect(consoleOutput).toEqual([
        'Amir Aziz has status active but no day specified. Please fill in the day!',
        'Ibrahim Khan has status absence but no day specified. Please fill in the day!',
    ])

    console.warn = originalWarn
  })
})
