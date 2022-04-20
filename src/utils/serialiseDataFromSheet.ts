const NAME = 0;
const DAYS = 1;
const STATUS = 2;
const NOTES = 3;

interface AgentDetails {
  name: string,
  status: string,
  notes: string
}

interface SerialisedOutput {
  Monday: Array<AgentDetails>,
  Tuesday: Array<AgentDetails>,
  Wednesday: Array<AgentDetails>,
  Thursday: Array<AgentDetails>,
  Friday: Array<AgentDetails>,
  Saturday: Array<AgentDetails>,
  Sunday: Array<AgentDetails>,
  Adhoc: Array<AgentDetails>,
}

function formatDataFromSheet(data: Array<Array<string>>) : SerialisedOutput  {
  const newData = [...data];
  const serialisedOutput : SerialisedOutput = {Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[], Sunday:[], Adhoc: []} 
  newData.forEach((schedule) => {
    if(["active", "absence", "adhoc"].includes(schedule[STATUS])) {
      const hasMultipleDays = schedule[DAYS].split(',').length > 1;

      if(schedule[STATUS] === "adhoc") {
        serialisedOutput["Adhoc"].push({
          name: schedule[NAME],
          status: schedule[STATUS],
          notes: schedule[NOTES]
        })
        return
      }

      if(!hasMultipleDays) {
        serialisedOutput[schedule[DAYS]].push({
          name: schedule[NAME],
          status: schedule[STATUS],
          notes: schedule[NOTES]
        })
        return
      }
      const multipleDays = schedule[DAYS].split(',')
      multipleDays.forEach(day => {
        // worst case O(8)
        serialisedOutput[day].push({
          name: schedule[NAME],
          status: schedule[STATUS],
          notes: schedule[NOTES]
        })
      })
    }
  })

  return serialisedOutput;
  
}

export {
  formatDataFromSheet as default
}
