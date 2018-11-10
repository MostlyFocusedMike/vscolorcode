console.log(process.cwd())

var fs = require('fs');
var dir = './.vscode';
var settingsFile = './.vscode/settings.json'

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
    }

}
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions.green))
} if (fs.existsSync(settingsFile)) {
    console.log('It already exists')
    const settings = require('./.vscode/settings.json')
    console.log('settings:', settings)
}