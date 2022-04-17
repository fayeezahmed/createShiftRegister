
const dayCellMap = {
  "Monday" : "A1:B1",
  "Tuesday" : "C1:D1",
  "Wednesday" : "E1:F1",
  "Thursday" : "G1:H1",
  "Friday" : "I1:J1",
  "Saturday" : "K1:L1",
  "Sunday" : "M1:N1"
}

function formatChatAgentSchedule() {
  onOpen()
  const activeSheet = SpreadsheetApp.getActiveSheet()
  const values = activeSheet.getRange("Chat Agents!A2:C8").getValues();
  const scheduleSheet = createSheet("Weekly Schedule");
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(setupDays);
  Logger.log(JSON.stringify(values));
  }

function setupDays(day, index) {
  const activeSheet = SpreadsheetApp.getActiveSheet();
  // activeSheet.getRange("Weekly Schedule!").setValue("Chat Agents");
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Monday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Tuesday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Wednesday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Thursday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Friday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Saturday"]}`).merge()
  activeSheet.getRange(`Weekly Schedule!${dayCellMap["Sunday"]}`).merge()
  

  const { nextWeekDates, year, month } = getNextWeekDates();
  nextWeekDates.forEach(date => {
    const day = new Date(year, month, date)
    const formattedDay = Utilities.formatDate(day, "GMT", "EEEE d");
    const dayName = day.toLocaleString('en-GB', { weekday: 'long' })
    activeSheet.getRange(`Weekly Schedule!${dayCellMap[dayName]}`).setValue(formattedDay)
  })
  // const mon = Utilities.formatDate(new Date(2022, 3, 18), "GMT", "Ed");
  // activeSheet.getRange(`Weekly Schedule!${MON_CELL}`).setValue(mon)
}

function getNextWeekDates() {
  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const nextWeekDates = [dayOfMonth + (8 - dayOfWeek)];

  for(let i = 1; i < 7; i++) {
    nextWeekDates.push(nextWeekDates[0] + i);
  }

  return  { nextWeekDates, year, month }
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