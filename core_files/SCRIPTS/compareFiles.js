const stringSimilarity = require('string-similarity');
const dbfiles = require('../database_files/database_connect');

function compareFiles(file) {
    let mainFile = [];
    let sumSimArr = [];
    let sumSim = 0;
    let total = 0;

    let fileObject = JSON.parse(file);
    dbfiles.takeFileObject(fileObject);

    for (let item in fileObject) {
        if (fileObject[item].chosen) {
            mainFile = fileObject[item].file;
        }
        total += 1;
    }

    for (let i = 1; i < total; i++) {

        let len1 = 0;
        let len2 = 0;

        if (mainFile.length > fileObject[i].file.length) {
            len1 = fileObject[i].file.length;
            len2 = mainFile.length;
        } else {
            len = mainFile.length;
            len2 = fileObject[i].file.length;
        }

        for (let j = 0; j < len1; j++) {
            for (let k = 0; k < len2; k++) {
                sumSim += stringSimilarity.compareTwoStrings(mainFile[j], fileObject[i].file[j]);
            }
        }

        sumSimArr.push(sumSim);
    }

    console.log(" arr: " + sumSimArr);

    return sumSimArr;
}

module.exports = { compareFiles };