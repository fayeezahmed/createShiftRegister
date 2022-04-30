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

const cache = { 'Monday': 2, 'Tuesday': 2, 'Wednesday': 2, 'Thursday': 2, 'Friday': 2, 'Saturday': 2, 'Sunday': 2}

function renderSchedule(
  activeSheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetName: string
) {
  const data = getData();
  const serlialisedData = serialiseDataFromSheet(data);
  const parsedSheetName = `${sheetName}!`
  
  days.forEach(day => {
    serlialisedData[day].forEach((chatAgent) => {
        const cellCache = cache[day];
        const nameCell = `${columnMap[day][0]}${cellCache}`;
        const infoCell = `${columnMap[day][1]}${cellCache}`
        const nameCellFull = `${parsedSheetName}${nameCell}`;
        const infoCellFull = `${parsedSheetName}${infoCell}`;
        const range = `${parsedSheetName}${nameCell}:${infoCell}`;
        activeSheet.getRange(nameCellFull).setValue(chatAgent.name);
        activeSheet.getRange(infoCellFull).setValue(chatAgent.notes);
        if (chatAgent.status === 'absence')
            activeSheet.getRange(range).setBackground('orange');
        cache[day]++;
    });
  })
}

export {
  renderSchedule
}
