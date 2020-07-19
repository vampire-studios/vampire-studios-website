const {GoogleSpreadsheet} = require('google-spreadsheet');

const doc = new GoogleSpreadsheet("SPREADSHEET_ID")

const lang_list = [];
const project_list = []

async function main() {
    await doc.useServiceAccountAuth({
        client_email: "GOOGLE_SERVICE_ACCOUNT_EMAIL",
        private_key: "GOOGLE_PRIVATE_KEY",
    })
    await doc.loadInfo();
    await loadLanguageList
}

async function loadLanguageList() {
    let lang_sheet = null;
    for (let index = 0; index < doc.sheetsByIndex.length; index++) {
        if (doc.sheetsByIndex[index]["_rawProperties"]["title"] === "Language-Info") {
            lang_sheet = doc.sheetsByIndex[index]
        } else {
            project_list.push({
                index: index,
                name: doc.sheetsByIndex[index]["_rawProperties"]["title"]
            })
        }
    }
    let rows = await lang_sheet.getRows();
    await lang_sheet.loadCells();
    let columnCount = lang_sheet.columnCount;

    for (let index = 1; index < columnCount; index++) {
        lang_list.push({
            code: lang_sheet.getCell(0, index).value,
            name: lang_sheet.getCell(1, index).value,
            region: lang_sheet.getCell(2, index).value
        })
    }

    var project_sel = document.getElementById("project-form");

    project_list.forEach(project_info => {
        var opt = document.createElement("option")
        opt.appendChild(document.createTextNode(project_info.name))
        opt.value = "project-" + project_info.index
        project_sel.appendChild(opt)
    });

    var lang_sel = document.getElementById("language-form");

    lang_sel.forEach(language_info => {
        var opt = document.createElement("option")
        opt.appendChild(document.createTextNode(language_info.name + " (" + language_info.name + ")"))
        opt.value = "lang-" + language_info.code
        lang_sel.appendChild(opt)
    });
    
}

document.getElementById("valid-info-button").onclick = async function onInfoSend() {
    console.log("Info sent!")
    var show_mod = document.getElementById("show-mod-form").value
    var language = document.getElementById("language-form").value
    var project = document.getElementById("project-form").value

    if (project !== "-" && language !== "-") {

    } else {
        return
    }
}

main();