# vscolorcode
Set your VS Code window color quickly and easily

## What is it? 
```vscolorcode``` is a nifty little package that will make edits to your .vscode/settings.json file to color each of your projects differently. It will only affect the colors of the window bars, and wont alter any other settings. It will create the file if you haven't already. 

## Install 
This is a global NPM package so install with:     

```
npm i -g vscolorcode
```
Once installed, you can use the ```vscolor``` command in the terminal to quickly color your VS Code window's title and activity bar.
## Using the preset colors
There are 7 default colors to choose from: red, orange, yellow, green, blue, purple, and black. To use one simply do: 

```bash
vscolor blue
```
## Using custom colors 
Why limit yourself to only 7 colors? By using the ```-c``` option, you can create any color combos you like. You can pass 1, 2, or 3 hex codes  with the ```-c``` option. **DO NOT use the #, just put the hex value**. Depending on how many hex codes you pass in, here is what they mean: 
```
vscolor -c 012345 
# colors the title and activity bar the given color, and defaults text to #FFF

vscolor -c 012345 010101
# colors the title and activity bar the first color, and the second is the title bar font color

vscolor -c 012345 129945 010101
# title bar color, activity bar color, text color
```

## Setting up aliases 
If you don't want to type all that out every time, use the ```--alias``` option to list out the preset colors and a template for the custom ones, and then just copy it into wherever you keep your bash aliases. Or, you could just copy them from here: 

```
# VSCOLORCODE COLORS
alias vsred="vscolor red"
alias vsorange="vscolor orange"
alias vsyellow="vscolor yellow"
alias vsgreen="vscolor green"
alias vsblue="vscolor blue"
alias vspurple="vscolor purple"
alias vsblack="vscolor black"
# alias [CUSTOM COLOR HERE]="vscolor -c [TITLE BAR HEX] [ACTIVITY BAR HEX] [FONT HEX]"
alias vsgray="vscolor -c 999 222 FFF"    # do not use \'#\' with the hex codes\n'
```

### Contribute 
Feel free to shoot me an email at mostlyfocusedmike@gmail.com or just PR this repo. I made this real quick so I'm sure there are lots of other neat features that could be added.
