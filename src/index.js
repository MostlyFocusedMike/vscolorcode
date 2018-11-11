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

function setColorStd(color) {
    console.log('ok')
    const testFolder = './.vscode';

    fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
    })
    if (!fs.existsSync(vscodeDir)){
        console.log('here it doesn"t exits')
        fs.mkdirSync(vscodeDir);
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]))
    } else {
        console.log('dir exists')
        if (!fs.existsSync(settingsJSON)) {
            console.log('we are writing the file because it does not exist')
            fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]))
        }
        console.log('file should exist')
        let settings;
        try {
            settings = require('../.vscode/settings.json')
        } catch (err) {
            let test = require('../package.json')
            settings = require('./.vscode/settings.json')
        }
        settings[workbenchStr] = {...settings[workbenchStr], ...colorOptions[color][workbenchStr]}
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(settings))
    }
}

function setColorCustom() {
    let titleBar = `#${process.argv[3]}`;
    let activityBar = `#${process.argv[3]}`;
    let font = "#FFF";
    
    if (process.argv.length === 5) { // title bar color, font color
        font = `#${process.argv[4]}`
    } else if (process.argv.length === 6) { // title bar color, activity bar color, font color
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
    setColorStd("custom")
}

function setColors() {
    console.log('Current working dir: ', process.cwd())
    if (arg1 === "-c") {
        setColorCustom()
    } else {
        setColorStd(arg1)
    }
}

exports.setColors = setColors
