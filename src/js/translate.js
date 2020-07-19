import GoogleSpreadsheet from 'google-spreadsheet'

var doc = new GoogleSpreadsheet("")

async function main() {
    await doc.useServiceAccountAuth({})
}

main();