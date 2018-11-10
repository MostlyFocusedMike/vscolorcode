console.log(process.cwd())

var fs = require('fs');
var dir = './.vscode';
var settingsFile = './.vscode/settings.json'
const customs = "workbench.colorCustomizations"

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

}
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions.green))
} else {
    if (!fs.existsSync(settingsFile)) fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions.green))
    const settings = require('../.vscode/settings.json')
    settings[customs] = {...settings[customs], ...colorOptions.green[customs]}
    fs.writeFileSync("./.vscode/settings.json", JSON.stringify(settings))
}