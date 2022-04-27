import getData from "../utils/getDataFromSheet";
import serialiseDataFromSheet from "../utils/serialiseDataFromSheet";
import { AgentDetails } from '../types';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const columnMap = {
  "Monday": ["A", "B"],
  "Tuesday": ["C", "D"],
  "Wednesday": ["E", "F"],
  "Thursday": ["G", "H"],
  "Friday": ["I", "J"],
  "Saturday": ["K", "L"],
  "Sunday": ["M", "N"],
  "Adhoc": ["O", "P"]
}

function renderSchedule(
  activeSheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetName: string
) {
  const data = getData();
  const serlialisedData = serialiseDataFromSheet(data);
  
  days.forEach(day => {
    serlialisedData[day].forEach((chatAgent: AgentDetails) => {
      const nameCell = `${sheetName}!${columnMap[day][0]}2`;
      const infoCell = `${sheetName}!${columnMap[day][1]}2`;
      activeSheet.getRange(nameCell).setValue(chatAgent.name)
      activeSheet.getRange(infoCell).setValue(chatAgent.notes)
      if(chatAgent.status === 'absence') activeSheet.getRange(`${nameCell}:${infoCell}`).setBackground('orange')
    })
  })
}

export {
  renderSchedule
}
