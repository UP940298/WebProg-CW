/*
    Import string similarity module from npm and the database file. 
*/

const strSim = require('string-similarity');

/*
    Main function that takes the file object and compares each string of each file to the main file. Uses the string similarity module.
    Stores the similarity float in an array to be displayed in a report showing which files are most similar.
*/

function compareFilesMain(file) {
    let mainFile = [];
    let sumSimArr = [];
    let sumSim = 0;
    let objArr = [];

    let fileObject = JSON.parse(file);
    console.log("parse" + fileObject);

    //Decides which file of the object is the main file.
    for (let item in fileObject) {
        if (fileObject[item].chosen) {
            mainFile = fileObject[item].file;
            fileObject.splice(item, 1);
        }
    }

    //Loops through each file, compares each string of the file with each string of the main file.
    //Checks which file is bigger to use as the loop length.

    for (let i = 0; i < fileObject.length; i++) {

        let len1 = 0;
        let len2 = 0;

        if (mainFile.length > fileObject[i].file.length) {
            len1 = fileObject[i].file.length;
            len2 = mainFile.length;
        } else {
            len1 = mainFile.length;
            len2 = fileObject[i].file.length;
        }

        console.log(len1, len2);

        for (let j = 0; j < len1; j++) {

            for (let k = 0; k < len2; k++) {
                sumSim += strSim.compareTwoStrings(mainFile[j], fileObject[i].file[j]);
            }
        }

        let obj = {
            name: fileObject[i].name,
            similarity: sumSim
        }

        sumSimArr.push(sumSim);
        objArr.push(obj);
    }

    return objArr;
}

module.exports = { compareFilesMain };