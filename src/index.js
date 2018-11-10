console.log(process.cwd())

const fs = require('fs');
const vscodeDir = './.vscode';
const settingsJSON = './.vscode/settings.json'
const workbenchStr = "workbench.colorCustomizations"
const arg1 = process.argv[2]

const colorOptions = {
    green: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.activeBackground": "#009900",
            "activityBar.background": "#009900",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    blue: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.activeBackground": "#000099",
            "activityBar.background": "#000099",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
}

function setColorStd() {
    if (!fs.existsSync(vscodeDir)){
        fs.mkdirSync(vscodeDir);
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[arg1]))
    } else {
        if (!fs.existsSync(settingsJSON)) fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[arg1]))
        const settings = require('../.vscode/settings.json')
        settings[workbenchStr] = {...settings[workbenchStr], ...colorOptions[arg1][workbenchStr]}
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(settings))
    }
}

function setColorCustom() {
    let titleBar,
        activityBar,
        font = "#FFF"
    if (process.argv.length === 4) { // bar color, default text color
        titleBar = `#${process.argv[3]}`
        activityBar = `#${process.argv[3]}`
    } else if (process.argv.length === 5) { // title bar color, font color
        titleBar = `#${process.argv[3]}`
        activityBar = `#${process.argv[3]}`
        font = `#${process.argv[4]}`
    } else if (process.argv.length === 6) { // title bar color, activity bar color, font color
        titleBar = `#${process.argv[3]}`
        activityBar = `#${process.argv[4]}`
        font = `#${process.argv[5]}`
    }
    colorOptions.custom = {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": font,
            "titleBar.activeBackground": titleBar,
            "activityBar.background": activityBar,
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    }
    console.log('len', process.argv)
    if (!fs.existsSync(vscodeDir)){
        fs.mkdirSync(vscodeDir);
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions.custom))
    } else {
        if (!fs.existsSync(settingsJSON)) fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions.custom))
        const settings = require('../.vscode/settings.json')
        settings[workbenchStr] = {...settings[workbenchStr], ...colorOptions.custom[workbenchStr]}
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(settings))
    }
}

if (arg1 === "-c") {
    setColorCustom()
} else {
    setColorStd()
}
