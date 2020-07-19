const {GoogleSpreadsheet} = require('google-spreadsheet');

// const config_file = require('../config.json')

const doc = new GoogleSpreadsheet("SPREADSHEET_ID"/*.replace("SPREADSHEET_ID", config_file.spreadsheet_id)*/)

const lang_list = [];
const project_list = []

async function main() {
    await doc.useServiceAccountAuth({
        client_email: "GOOGLE_SERVICE_ACCOUNT_EMAIL"/*.replace("GOOGLE_SERVICE_ACCOUNT_EMAIL", config_file.email)*/,
        private_key: "GOOGLE_PRIVATE_KEY"/*.replace("GOOGLE_PRIVATE_KEY", config_file.key)*/,
    })
    await doc.loadInfo();
    await loadLanguageList()
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
        if (lang_sheet.getCell(0, index).value === "null" || lang_sheet.getCell(0, index).value === null || lang_sheet.getCell(0, index).value === "" || lang_sheet.getCell(0, index).value === "en_us") continue
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

    lang_list.forEach(language_info => {
        var opt = document.createElement("option")
        opt.appendChild(document.createTextNode(language_info.name + " (" + language_info.region + ")"))
        opt.value = "lang-" + language_info.code
        lang_sel.appendChild(opt)
    });
    
}

document.getElementById("valid-info-button").onclick = async function onInfoSend() {
    var show_mod = document.getElementById("show-mod-form").value
    var language = document.getElementById("language-form").value.replace("lang-","")
    var project = document.getElementById("project-form").value.replace("project-","")
    
    if (project !== "-" && language !== "-") {
        let project_sheet = doc.sheetsByIndex[Number.parseInt(project)]

        let rows = await project_sheet.getRows();
        await project_sheet.loadCells();
        let columnCount = project_sheet.columnCount;
        let elementToRender = []
        let newLanguage = false;
        let languageColumnNumber = 0;
        for (let index = 1; index < columnCount; index++) {
            if (project_sheet.getCell(0, index).value === language) {
                languageColumnNumber = index;
                break
            }
            if (project_sheet.getCell(0, index).value === null || project_sheet.getCell(0, index).value === "null" || project_sheet.getCell(0, index).value === "") {
                newLanguage = true;
                languageColumnNumber = index;
                break
            }
        }
        
        if (show_mod === "not translated") {
            if (newLanguage) {
                for (let index = 1; index < rows.length+1; index++) {
                    if (project_sheet.getCell(index, 0).value === null || project_sheet.getCell(index, 0).value === "null" || project_sheet.getCell(index, 0).value === "") continue
                    var object = {
                        index: index,
                        key: project_sheet.getCell(index, 0).value,
                        english: project_sheet.getCell(index, 1).value,
                        lang: ""
                    }
                    elementToRender.push(object)
                }
                var cell = project_sheet.getCell(0, languageColumnNumber)
                cell.value = language;
                await cell.save()
            } else {
                for (let index = 1; index < rows.length+1; index++) {
                    if (project_sheet.getCell(index, 0).value === null || project_sheet.getCell(index, 0).value === "null" || project_sheet.getCell(index, 0).value === "" || project_sheet.getCell(index, languageColumnNumber).value !== null) continue
                    var object = {
                        index: index,
                        key: project_sheet.getCell(index, 0).value,
                        english: project_sheet.getCell(index, 1).value,
                        lang: ""
                    }
                    elementToRender.push(object)
                }
            }
        } else if (show_mod === "translated") {
            if (!newLanguage) {
                for (let index = 1; index < rows.length+1; index++) {
                    if (project_sheet.getCell(index, 0).value === null 
                    || project_sheet.getCell(index, 0).value === "null" 
                    || project_sheet.getCell(index, 0).value === "" 
                    || project_sheet.getCell(index, languageColumnNumber).value === null) continue
                    var object = {
                        index: index,
                        key: project_sheet.getCell(index, 0).value,
                        english: project_sheet.getCell(index, 1).value,
                        lang: project_sheet.getCell(index, languageColumnNumber).value
                    }
                    elementToRender.push(object)
                }
            }
        } else {
            for (let index = 1; index < rows.length+1; index++) {
                if (project_sheet.getCell(index, 0).value === null 
                    || project_sheet.getCell(index, 0).value === "null" 
                    || project_sheet.getCell(index, 0).value === "" ) continue
                var object = {
                    index: index,
                    key: project_sheet.getCell(index, 0).value,
                    english: project_sheet.getCell(index, 1).value,
                    lang: project_sheet.getCell(index, languageColumnNumber).value
                }
                elementToRender.push(object)
            }
        }
        let list = document.getElementById("translation-list")
        while( list.firstChild ){
            list.removeChild( list.firstChild );
        }
        for (const key in elementToRender) {
            if (elementToRender.hasOwnProperty(key)) {
                const translation_item = elementToRender[key];
                createTranslationItem(translation_item, languageColumnNumber, project)
            }
        }

    } else {
        return
    }
}

function createTranslationItem(item_infos, languageColumn, project) {
    let list = document.getElementById("translation-list")
    let item = document.createElement("div")

    let label = document.createElement("label")
    label.innerText = "Key: " + item_infos.key
    label.id = "key-" + item_infos.index

    item.appendChild(label)

    let paragraph = document.createElement("p")
    paragraph.innerText = "English: " + item_infos.english
    paragraph.id = "english-" + item_infos.index

    item.appendChild(paragraph)

    let input = document.createElement('input')
    input.type = "text"
    input.id = "lang-" + item_infos.index
    input.value = item_infos.lang

    item.appendChild(input)
    
    let button = document.createElement("input")
    button.type = "button"
    button.id = "button-" + item_infos.index
    button.value = "Save"
    button.onclick = async (event) => {
        await saveTranslation(item_infos, languageColumn, project)
    }

    item.appendChild(button)

    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))


    let li = document.createElement("li")
    li.appendChild(item)
    list.appendChild(li)
}

async function saveTranslation(item_infos, languageColumn, project) {
    const project_sheet = doc.sheetsByIndex[project]
    const cell = project_sheet.getCell(item_infos.index, languageColumn)
    cell.value = document.getElementById("lang-" + item_infos.index).value
    await cell.save()
}

main();