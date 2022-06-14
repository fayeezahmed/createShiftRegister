import getData from "../utils/getDataFromSheet";
import serialiseDataFromSheet from "../utils/serialiseDataFromSheet";
import { AgentDetails } from '../types';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Adhoc"]
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
const lightCornFlowerBlue2 = '#a4c2f4'

// This is the last inputted row for each day, so we don't overwrite the previous cell with a new chat agent
const initialRowNum = 2
const nextRow = { 'Monday': initialRowNum, 'Tuesday': initialRowNum, 'Wednesday': initialRowNum, 'Thursday': initialRowNum, 'Friday': initialRowNum, 'Saturday': initialRowNum, 'Sunday': initialRowNum, 'Adhoc': initialRowNum}

function renderSchedule(
  activeSheet: GoogleAppsScript.Spreadsheet.Sheet,
  sheetName: string
) {
  const data = getData();
  const serlialisedData = serialiseDataFromSheet(data);
  const parsedSheetName = `${sheetName}!`
  
  days.forEach(day => {
    serlialisedData[day].forEach((chatAgent) => {
        const cellCache = nextRow[day];
        const nameCell = `${columnMap[day][0]}${cellCache}`;
        const infoCell = `${columnMap[day][1]}${cellCache}`
        const nameCellFull = `${parsedSheetName}${nameCell}`;
        const infoCellFull = `${parsedSheetName}${infoCell}`;
        const range = `${parsedSheetName}${nameCell}:${infoCell}`;
        activeSheet.getRange(nameCellFull).setValue(chatAgent.name);
        activeSheet.getRange(infoCellFull).setValue(chatAgent.notes);
        if (chatAgent.status === 'absence'){
            activeSheet.getRange(range).setBackground('orange');
        }
        if (chatAgent.status === 'adhoc'){
            activeSheet.getRange(range).setBackground(lightCornFlowerBlue2);
        }
        nextRow[day]++;
    });
  })
}

export {
  renderSchedule
}
