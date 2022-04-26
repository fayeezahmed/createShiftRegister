function getData() {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Chat Agents');
    const lastRow = activeSheet.getLastRow()
    const notationQuery = `Chat Agents!A2:D${lastRow}`
    const data = activeSheet.getRange(notationQuery)

    return data.getValues()
}

export default getData;
