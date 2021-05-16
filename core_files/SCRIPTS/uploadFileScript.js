const manualInput = document.querySelector("#manualInput");
const fileLoadedDiv = document.querySelector("#fileLoadedDiv");
const fileObject = [];

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

        let manualFileDiv = document.createElement('div');
        let manualFileIcon = document.createElement('span');
        let manualFileText = document.createElement('span');

        manualFileText.innerHTML = file.name;

        manualFileIcon.innerHTML = convert(file.name);

        manualFileDiv.classList.add("fileDivContainer");
        manualFileDiv.addEventListener('click', function () {

            if (fileLoadedDiv.querySelector('#chosenOne') == null) {
                manualFileDiv.id = 'chosenOne';
            } else {
                manualFileDiv.id = '';
            }
            isChosen(fileObject);
        });

        manualFileIcon.classList.add("fileIconStyle");
        manualFileText.classList.add("fileTextStyle");

        manualFileDiv.appendChild(manualFileIcon);
        manualFileDiv.appendChild(manualFileText);
        fileLoadedDiv.appendChild(manualFileDiv);

        readFileToText(file);
    }

    printFiles(file_list.length);
}

function isChosen(fileObject) {

    let fileName = "";

    if (fileLoadedDiv.querySelector('#chosenOne') != null) {
        let temp = fileLoadedDiv.querySelector('#chosenOne');
        fileName = temp.childNodes[length].textContent;
    }

    for (let item in fileObject) {
        if (fileObject[item].name == fileName) {
            fileObject[item].chosen = true;
        }
    }

    sortFiles(fileObject);
}

/**
 * Function that handles the files. Reads all of the files to text and splits them into an array.
 * Other functions clean up the file to be more appropriate for comparison.
 */

function readFileToText(file) {

    var reader = new FileReader();

    reader.onload = function (fileUploaded) {
        var textFile = fileUploaded.target.result;

        isExtension(file, textFile);
    }
    reader.readAsText(file);
}


function isExtension(file, textFile) {

    let ext = grabExt(file);

    switch (ext.toLowerCase()) {
        case 'html':
            cleanUpHTML(file, textFile);
            break;
        case 'js':
            cleanUpJS(file, textFile);
            break;
        case 'css':
            cleanUpCSS(file, textFile);
            break;
    }
}


function cleanUpJS(file, jsRaw) {
    let splitJS = jsRaw.split(/ |\n|;|{|}|[()]|=|"|,/);

    for (var i = splitJS.length - 1; i >= 0; i--) {
        if (splitJS[i] == "") {
            splitJS.splice(i, 1);
        }
    }

    let jsClean = splitJS.map(function (elem) {
        return elem.trim();
    });

    intoObject(file, jsClean);
}

function cleanUpCSS(file, cssRaw) {
    let splitCSS = cssRaw.split(/ |\n|;|:|,|{|}/);

    for (var i = splitCSS.length - 1; i >= 0; i--) {
        if (splitCSS[i] == "") {
            splitCSS.splice(i, 1);
        }
    }

    let cssClean = splitCSS.map(function (elem) {
        return elem.trim();
    });

    intoObject(file, cssClean);
}

function cleanUpHTML(file, htmlRaw) {
    let splitHTML = htmlRaw.split(/ |\n|=|;|"/);

    for (var i = splitHTML.length - 1; i >= 0; i--) {
        if (splitHTML[i] == "") {
            splitHTML.splice(i, 1);
        }
    }

    let htmlClean = splitHTML.map(function (elem) {
        return elem.trim();
    });

    intoObject(file, htmlClean);
}

function grabExt(extRaw) {
    let ext = extRaw.name.split('.');
    return ext[ext.length - 1];
}

function intoObject(file, item) {
    let storeFile = {
        chosen: "",
        name: file.name,
        file: item
    }
    fileObject.push(storeFile);
}

function showStoredFiles(file) {
    let storedFileDiv = document.createElement('div');
    let storedFileIcon = document.createElement('span');
    let storedFileText = document.createElement('span');

    storedFileText.innerHTML = file.name;

    storedFileIcon.innerHTML = convert(file.name);

    storedFileDiv.classList.add("fileDivContainer");

    /*
    storedFileDiv.addEventListener('click', function () {

        if (fileLoadedDiv.querySelector('#chosenOne') == null) {
            manualFileDiv.id = 'chosenOne';
        } else {
            manualFileDiv.id = '';
        }
        isChosen(fileObject);
    });
    */

    storedFileIcon.classList.add("fileIconStyle");
    storedFileText.classList.add("fileTextStyle");

    storedFileDiv.appendChild(storedFileIcon);
    storedFileDiv.appendChild(storedFileText);
    fileLoadedDiv.appendChild(storedFileDiv);
}