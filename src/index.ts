import { getNextWeekDates } from "./utils/getNextWeekDates";
import { dayCellMap } from "./utils/dayCellMap";
import { renderSchedule } from "./view/renderSchedule";


function formatChatAgentSchedule() {
  onOpen()
  const activeSheet = SpreadsheetApp.getActiveSheet()
  const values = activeSheet.getRange("Chat Agents!A2:C8").getValues();
  const scheduleSheet = createSheet("Weekly Schedule");
  const sheetName = setupDays()
  
  renderSchedule(activeSheet, sheetName);
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
  

  const nextWeekDates  = getNextWeekDates(new Date());
  nextWeekDates.forEach(date => {
    const day = new Date(date)
    const dayName = day.toLocaleString('en-GB', { weekday: 'long' });
    const formattedDay = `${dayName} ${day.getDate()}`
    activeSheet.getRange(`Weekly Schedule!${dayCellMap[dayName]}`).setValue(formattedDay)
  })

  const sheetName = renameSheet(nextWeekDates, activeSheet)
  return sheetName;
}

function renameSheet(nextWeekDates, activeSheet) {
  const [ firstDate,,,,,,lastDate ] = nextWeekDates;
  const formattedFirst = `${firstDate.getDate()}/${firstDate.getMonth()}`
  const formattedLast = `${lastDate.getDate()}/${lastDate.getMonth()}`
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

