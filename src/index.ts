import { getNextWeekDates } from "./utils/getNextWeekDates";
import { dayCellMap } from "./utils/dayCellMap";
import { renderSchedule } from "./view/renderSchedule";
import { columnMap } from './constants/columnMap';


function formatChatAgentSchedule() {
  onOpen()
  const activeSheet = SpreadsheetApp.getActiveSheet()
  const values = activeSheet.getRange("Chat Agents!A2:C8").getValues();
  const scheduleSheet = createSheet("Weekly Schedule");
  const sheetName = setupDays()
  
  renderSchedule(activeSheet, sheetName);
}

function setStyling(activeSheet) {
  // set column wdith of columns until O
  activeSheet.setColumnWidths(1, 15, 150);
  // set column width of P longer as it's adhoc and has longer text usually
  activeSheet.setColumnWidth(16, 300);
  
  // 1,2  5,6  9,10  13,14
  const columns =[[1,2], [5,6], [9,10], [13,14]]
  const lastRow = activeSheet.getMaxRow();
  const lightGrey = '#cccccc'
  Object.keys(columnMap).forEach((day) => {
    const fromNotation = `${columnMap[day][0]}1` //A1
    const toNotation = `${columnMap[day][1]}1000` //B1000
    activeSheet.getRange(`${fromNotation}:${toNotation}`).setBackground(lightGrey)
  });

  const style = SpreadsheetApp.newTextStyle()
    .setFontSize(12)
    .setBold(true)
    .build();

  const headers = activeSheet.getRange('Weekly Schedule!A1:Z1')
  const allCells = activeSheet.getRange('Weekly Schedule!A1:Z100')
  headers.setTextStyle(style);
  headers.setHorizontalAlignment('center')

  allCells.setWrap(true)
}

function setupDays() {
  const activeSheet = SpreadsheetApp.getActiveSheet();
  // activeSheet.getRange("Weekly Schedule!").setValue("Chat Agents");
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Monday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Tuesday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Wednesday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Thursday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Friday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Saturday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Sunday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Adhoc"]}`).merge()
  setStyling(activeSheet)
  

  const nextWeekDates  = getNextWeekDates(new Date());
  nextWeekDates.forEach(date => {
    const day = new Date(date)
    const dayName = day.toLocaleString('en-GB', { weekday: 'long' });
    const formattedDay = `${dayName} ${day.getDate()}`
    activeSheet.getRange(`Weekly Schedule!${dayCellMap[dayName]}`).setValue(formattedDay)
  })

  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Adhoc"]}`).setValue('Adhoc')

  const sheetName = renameSheet(nextWeekDates, activeSheet)
  return sheetName;
}

function renameSheet(nextWeekDates, activeSheet) {
  const [ firstDate,,,,,,lastDate ] = nextWeekDates;
  const formattedFirst = `${firstDate.getDate()}/${firstDate.getMonth() + 1}`
  const formattedLast = `${lastDate.getDate()}/${lastDate.getMonth() + 1}`
  const sheetName = `${formattedFirst} - ${formattedLast}`
  activeSheet.setName(sheetName)
  return sheetName;
}


function createSheet(name) {
  const newSheet = SpreadsheetApp.getActive().insertSheet();
  newSheet.setName(name);
  return newSheet;
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CreateShiftRegister')
      .addItem('Run', 'formatChatAgentSchedule')
      .addToUi();
}

(global as any).onOpen = onOpen;
(global as any).getNextWeekDates = getNextWeekDates;
(global as any).createSheet = createSheet;
(global as any).formatChatAgentSchedule = formatChatAgentSchedule;
(global as any).setupDays = setupDays;
(global as any).renderSchedule = renderSchedule;
(global as any).renameSheet = renameSheet;

