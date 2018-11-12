const fs = require('fs');
const vscodeDir = './.vscode';
const settingsJSON = './.vscode/settings.json'
const workbenchStr = "workbench.colorCustomizations"
const arg1 = process.argv[2]

const colorOptions = {
    red: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.activeBackground": "#ab0000",
            "activityBar.background": "#5e0b0b",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    pink: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#000",
            "titleBar.activeBackground": "#f747bd",
            "activityBar.background": "#de1196",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    orange: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#000",
            "titleBar.activeBackground": "#ff8533",
            "activityBar.background": "#b34700",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    yellow: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#000",
            "titleBar.activeBackground": "#ffff1a",
            "activityBar.background": "#aa9900",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    green: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.activeBackground": "#00994d",
            "activityBar.background": "#004d26",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    blue: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.activeBackground": "#0079d5",
            "activityBar.background": "#001f33",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    purple: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#fff",
            "titleBar.activeBackground": "#993399",
            "activityBar.background": "#4d194d",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    black: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#eee",
            "titleBar.activeBackground": "#050505",
            "activityBar.background": "#000",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
    white: {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": "#000",
            "titleBar.activeBackground": "#FFF",
            "activityBar.background": "#DDD",
            "activityBar.foreground": "#111",
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    },
}

function setColorStd(color) {
    if (!fs.existsSync(vscodeDir)){
        fs.mkdirSync(vscodeDir);
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]))
    } else {
        if (!fs.existsSync(settingsJSON)) fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]));
        const settings = JSON.parse(fs.readFileSync('./.vscode/settings.json', 'utf8')); // for some reason require() won't work, maybe becuase it's a hidden file? 
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
    if (arg1 === "-c") {
        setColorCustom()
    } else {
        setColorStd(arg1)
    }
}

exports.setColors = setColors
