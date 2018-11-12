const fs = require('fs');
const vscodeDir = './.vscode';
const settingsJSON = './.vscode/settings.json'
const workbenchStr = "workbench.colorCustomizations"
const colorOptions = require("./colors.json")
const arg1 = process.argv[2]

function help() {
    console.log("The standard options are:\nred, orange, yellow, green, blue, purple, or black.")
    console.log("\nYou can also use the -c option for custom colors:\n\n\tvscolor -c [title bar hex] [activity bar hex] [font hex]\n")
    console.log("Here is a lighter blue:\n\n\tvscolor -c 4dc3ff 0099e6 FFF\n")
    console.log("Do not include the '#' when listing out the colors\n")
}

function setColorStd(color) {
    if (!colorOptions[color]) {
        console.log("\nLooks like that color isn't available.")
        help()
        return false;
    }
    if (!fs.existsSync(vscodeDir)){
        fs.mkdirSync(vscodeDir);
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]));
    } else {
        if (!fs.existsSync(settingsJSON)) fs.writeFileSync("./.vscode/settings.json", JSON.stringify(colorOptions[color]));
        const settings = JSON.parse(fs.readFileSync('./.vscode/settings.json', 'utf8')); 
        settings[workbenchStr] = {...settings[workbenchStr], ...colorOptions[color][workbenchStr]};
        fs.writeFileSync("./.vscode/settings.json", JSON.stringify(settings));
    }
    return true;
}

function setColorCustom() {
    let titleBar = `#${process.argv[3]}`;
    let activityBar = `#${process.argv[3]}`;
    let font = "#FFF";
    
    if (process.argv.length === 5) { // title bar color, font color
        font = `#${process.argv[4]}`;
    } else if (process.argv.length === 6) { // title bar color, activity bar color, font color
        activityBar = `#${process.argv[4]}`;
        font = `#${process.argv[5]}`;
    }
    colorOptions.custom = {
        "workbench.colorCustomizations": {
            "titleBar.activeForeground": font,
            "titleBar.activeBackground": titleBar,
            "activityBar.background": activityBar,
            "statusBar.background": "#111",
            "statusBar.foreground": "#ccc"
        }
    };
    setColorStd("custom");
}

function run() {
    if (arg1 === "-c") {
        setColorCustom()
    } else if (arg1 === "-h" || arg1 === "--help") {
        help() 
    } else {
        setColorStd(arg1)
    }
}

exports.run = run
