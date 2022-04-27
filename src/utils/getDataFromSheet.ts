function getData() {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Chat Agents');
    // @ts-ignore
    const lastRow = activeSheet.getLastRow()
    const notationQuery = `Chat Agents!A2:D${lastRow}`
    // @ts-ignore
    const data = activeSheet.getRange(notationQuery)

    return data.getValues()
}

export default getData;
