const manualInput = document.querySelector("#manualInput");
const fileLoadedDiv = document.querySelector("#fileLoadedDiv");
var arrayFile = [];

//Prevents the browser default behaviour of opening the file instantly.
function dragOverFile(file) {
    file.preventDefault();
}

/**
 * Function to allow drag and drop of files straight onto the page.
 * Checks if their are any items in the event then loops through each one.
 * Creates a div, img and label for each file and asigns a css class to each.
 */

function dropFile(file) {
    file.preventDefault();

    if (file.dataTransfer.items) {
        let fileInfo = "";
        for (var i = 0; i < file.dataTransfer.items.length; i++) {
            var rawFile = file.dataTransfer.items[i].getAsFile();

            console.log(rawFile.name);

            let fileDiv = document.createElement('div');
            let fileImg = document.createElement('img');
            let fileText = document.createElement('span');

            fileText.innerHTML = rawFile.name;
            fileImg.src = "../images/file.png";

            fileImg.classList.add("fileImgStyle");
            fileText.classList.add("fileTextStyle");

            fileDiv.appendChild(fileImg);
            fileDiv.appendChild(fileText);
            fileLoadedDiv.appendChild(fileDiv);
        }
    }
}

/**Function to manually input files using the "upload" input button.
 * Creates a div, img and label for each file uploaded.
 * Also adds a css class to each one.
**/

function manualInputFile() {
    const file_list = manualInput.files;

    for (let file of file_list) {
        console.log(file);

        let manualFileDiv = document.createElement('div');
        let manualFileImg = document.createElement('img');
        let manualFileText = document.createElement('span');

        manualFileText.innerHTML = file.name;
        manualFileImg.src = "../images/file.png";

        manualFileImg.classList.add("fileImgStyle");
        manualFileText.classList.add("fileTextStyle");

        manualFileDiv.appendChild(manualFileImg);
        manualFileDiv.appendChild(manualFileText);
        fileLoadedDiv.appendChild(manualFileDiv);

        readFileToText(file);
    }
    //sortFiles(arrayFile);
}

/**
 * Function that handles the files. Reads all of the files to text and splits them into an array.
 * Other functions clean up the file to be more appropriate for comparison.
 */

function readFileToText(file) {
    var reader = new FileReader();

    reader.onload = function (fileUploaded) {
        var textFile = fileUploaded.target.result;

        console.log(textFile);
        let rawFile = textFile.split("const");

        console.log(rawFile);

        arrayFile.push(file);
    };

    reader.readAsText(file);
}

function cleanUpFile(raw) {
    for (var i = raw.length - 1; i >= 0; i--) {
        if (raw[i] == "" || raw[i] == "}") {
            raw.splice(i, 1);
        }
    }

    raw = raw.map(function (elem) {
        return elem.trim();
    });

    return raw;
}

function typeOfFile() {

}