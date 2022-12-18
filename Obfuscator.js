// import the file which we want to hide
const fs = require("fs")

// import the ofuscator module
const jsOfuscator = require("javascript-obfuscator")

// Reading the js files
fs.readFile("./index.js", "utf-8", (error, codeIndex) => {
    if (error) {
        throw error
    }
    const ofuscatedIndexJS = jsOfuscator.obfuscate(codeIndex)

    fs.readFile("./constants.js", "utf-8", (error, codeConstants) => {
        if (error) {
            throw error
        }
        const ofuscatedConstantsJS = jsOfuscator.obfuscate(codeConstants)

        // write the hided js file into seperate file
        fs.writeFile(
            "./IndexProtected.js",
            ofuscatedIndexJS.getObfuscatedCode(),
            (fsError) => {
                if (fsError) {
                    return console.log(fsError)
                }
                console.log(
                    "your protected file is ready using javascript-obfuscator"
                )
            }
        )

        // write the hided js file into seperate file
        fs.writeFile(
            "./ConstantsProtected.js",
            ofuscatedConstantsJS.getObfuscatedCode(),
            (fsError) => {
                if (fsError) {
                    return console.log(fsError)
                }
                console.log(
                    "your protected file is ready using javascript-obfuscator"
                )
            }
        )
    })
})
