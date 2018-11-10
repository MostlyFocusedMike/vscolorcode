console.log(process.cwd())

const fs = require('fs');
const vscodeDir = './.vscode';
const settingsJSON = './.vscode/settings.json'
const workbenchStr = "workbench.colorCustomizations"
const color = process.argv[2]

const colorOptions = {
    green: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.inactiveBackground": "#00bb00",
            "titleBar.activeBackground": "#009900",
            "activityBar.background": "#224422",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    blue: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.inactiveBackground": "#0000bb",
            "titleBar.activeBackground": "#000099",
            "activityBar.background": "#222244",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    blue: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.inactiveBackground": "#0000bb",
            "titleBar.activeBackground": "#000099",
            "activityBar.background": "#222244",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
}
if (!fs.existsSync(vscodeDir)){
    fs.mkdirSync(vscodeDir);
    fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]))
} else {
    if (!fs.existsSync(settingsJSON)) fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]))
    const settings = require('../.vscode/settings.json')
    settings[workbenchStr] = {...settings[workbenchStr], ...colorOptions[color][workbenchStr]}
    fs.writeFileSync("./.vscode/settings.json", JSON.stringify(settings))
}