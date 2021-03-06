const vsColor = require('./index').vsColor

const aliasOutput = `Copy the following lines into your profile:
# VSCOLORCODE COLORSalias vsred=\"vscolor red\"alias vsorange=\"vscolor orange\"alias vsyellow=\"vscolor yellow\"alias vsgreen=\"vscolor green\"alias vsblue=\"vscolor blue\"alias vspurple=\"vscolor purple\"alias vsblack=\"vscolor black\"# alias [CUSTOM COLOR HERE]=\"vscolor -c [TITLE BAR HEX] [ACTIVITY BAR HEX] [FONT HEX]\"alias vsgray=\"vscolor -c 999 222 FFF\"    # do not use '#' with the hex codes
`

const helpOutput = `
The standard options are:
red, orange, yellow, green, blue, purple, or black.
You can also use the '-c' option for custom colors:

	vscolor -c [TITLE BAR HEX] [ACTIVITY BAR HEX] [FONT HEX]
Here is a lighter blue:

	vscolor -c 4dc3ff 0099e6 FFF
Do not include the '#' when listing out the colors
For a list of aliases, use the '--alias' option
`

// bare bones testing

describe('Main test', () => {
    beforeAll(() => {
        this.outputData = "";
        const storeLog = inputs => (this.outputData += inputs);
        console["log"] = jest.fn(storeLog);
        this.vsColor = new vsColor;
    })
    describe('alias and help functions', () => {
        afterEach(() => {
            this.outputData = "";
        });
        test('alias function should output the right message', () => {
            process.argv = ["", "", "--alias"]
            this.vsColor.run()
            expect(this.outputData).toBe(aliasOutput)
        })

        test('help function should output the right message', () => {
            process.argv = ["", "", "--help"]
            this.vsColor.run()
            expect(this.outputData).toBe(helpOutput)
          })
    })

    describe('preset colors', () => {
        test("It should work when given a valid preset", () => {
            process.argv = ["", "", "blue"]
            const spy = jest.spyOn(this.vsColor, 'setColorStd')
            this.vsColor.run()
            expect(spy).toHaveBeenCalledWith("blue");
        })

        test("It should call help() when given an invalid preset", () => {
            process.argv = ["", "", "blueasdas"]
            const spy = jest.spyOn(this.vsColor, 'setColorStd');
            const help = jest.spyOn(this.vsColor, 'help');
            this.vsColor.run()
            expect(spy).toHaveBeenCalledWith("blueasdas");
            expect(help).toHaveBeenCalled();
        })
    })

    describe('custom colors', () => {
        beforeEach(() => {
            this.standard = jest.spyOn(this.vsColor, 'setColorStd');
            this.custom = jest.spyOn(this.vsColor, 'setColorCustom');
        })
        test("It should create custom colors when given the -c option and 1 color", () => {
            process.argv = ["", "", "-c", "455"]
            this.vsColor.run()
            expect(this.vsColor.font).toEqual("#FFF")
            expect(this.vsColor.titleBar).toEqual("#455")
            expect(this.vsColor.activityBar).toEqual("#455")
            expect(this.custom).toHaveBeenCalled();
            expect(this.standard).toHaveBeenCalledWith("custom");
        })
        test("It should create custom colors when given the -c option and 2 colors", () => {
            process.argv = ["", "", "-c", "455", "000"]
            this.vsColor.run()
            expect(this.vsColor.font).toEqual("#000")
            expect(this.vsColor.titleBar).toEqual("#455")
            expect(this.vsColor.activityBar).toEqual("#455")
            expect(this.custom).toHaveBeenCalled();
            expect(this.standard).toHaveBeenCalledWith("custom");
        })
        test("It should create custom colors when given the -c option and 3 colors", () => {
            process.argv = ["", "", "-c", "455", "777", "000"]
            this.vsColor.run()
            expect(this.vsColor.font).toEqual("#000")
            expect(this.vsColor.titleBar).toEqual("#455")
            expect(this.vsColor.activityBar).toEqual("#777")
            expect(this.custom).toHaveBeenCalled();
            expect(this.standard).toHaveBeenCalledWith("custom");
        })
    })


})