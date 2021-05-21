var comparisonWindow = document.getElementById('fileUploadWindow');
var startBar = document.getElementById('startBar');
var xButton = document.getElementById('fileUploadWindowX');
var minButton = document.getElementById('fileUploadWindow-');
var fileButton = document.getElementById('fileUploadWindowFileButton');
var helpButton = document.getElementById('fileUploadWindowHelp');
var startMenu = document.getElementById('startMenu');
var startButt = document.getElementById('startButt');
var startMenuPlagButton = document.getElementById('plagButton');
var fileMenu = document.getElementById('fileButtonMenu');

/*
    Various functions that control small features of the main page.
    Practically all aesthetic or adding to the "theme" of the webpage.
*/

function openDetector(button) {

    var windowsBarOpenWindow = document.createElement('div');
    var windowName = document.createElement('span');

    windowName.id = "windowName";
    windowName.textContent = "Plagiarism Checker";
    windowsBarOpenWindow.appendChild(windowName);
    windowsBarOpenWindow.id = "openWindow";

    if (comparisonWindow.style.visibility == 'hidden') {
        comparisonWindow.style.visibility = 'visible';
    } else if (comparisonWindow.style.visibility == 'visible' && button == 'x' || button == '-') {
        comparisonWindow.style.visibility = 'hidden';
    }

    if (startBar.querySelector("#openWindow") == null && button != '-') {
        startBar.appendChild(windowsBarOpenWindow);
    } else if (startBar.querySelector("#openWindow") != null && button == 'x') {
        startBar.removeChild(startBar.querySelector('#openWindow'));
    } else if (startBar.querySelector("#openWindow") != null && button == '-') {
        document.getElementById('openWindow').id = 'minWindow';
    } else if (startBar.querySelector("#minWindow") != null && button == '-') {
        document.getElementById('minWindow').id = 'openWindow';
    }
}

xButton.addEventListener('click', function () {
    openDetector('x');
});

minButton.addEventListener('click', function () {
    openDetector('-');
    document.getElementById('minWindow').addEventListener('click', function () {
        openDetector('-');
    });
});


// Adds click event to the fileButton in the upload window that opens the file menu.

fileButton.addEventListener('click', function () {
    if (fileMenu.style.visibility == 'hidden') {
        fileMenu.style.visibility = 'visible';
    } else {
        fileMenu.style.visibility = 'hidden';
    }
});


// Adds click event to the help button to open the help window.

let help = document.getElementById('help');

helpButton.addEventListener('click', function () {
    if (help.style.visibility == 'hidden') {
        help.style.visibility = 'visible';
    } else {
        help.style.visibility = 'hidden';
    }
});


// Counts all of the files that are uploaded. Displays the number in the upload window.

var totalNum = 0;

function printFiles(fileNum) {
    totalNum += fileNum;
    var fileCount = document.getElementById('fileCount');
    fileCount.innerHTML = totalNum + " file(s)";
}

// Additional function that adds events to check if the users clicks the "f" and "h" keys, opens the file menu and help menu.

document.addEventListener('keydown', function (event) {
    if (event.key == "h" && comparisonWindow.style.visibility == 'visible' && help.style.display == 'none') {
        help.style.display = 'block';
    } else if (event.key == "h" && comparisonWindow.style.visibility == 'visible' && help.style.display == 'block') {
        help.style.display = 'none';
    }

    if (event.key == "f" && comparisonWindow.style.visibility == 'visible' && fileMenu.style.display == 'none') {
        fileMenu.style.display = 'block';
    } else if (event.key == "f" && comparisonWindow.style.visibility == 'visible' && fileMenu.style.display == 'block') {
        fileMenu.style.display = 'none';
    }
});


// Updates the time on the webpage.

function time() {
    var today = new Date();
    document.getElementById('time').innerHTML = today.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
    var timer = setTimeout(time, 1000);
}


// Click listener for the start menu, attached to the start button.

startButt.addEventListener('click', function () {

    if (startMenu.style.visibility == 'hidden') {
        startMenu.style.visibility = 'visible';
        startButt.id = 'clickedStartButt';
    } else {
        startMenu.style.visibility = 'hidden';
        startButt.id = 'startButt';
    }
});


// Click listener for the upload menu, user clicks the plagiarism checker button and the window opens.

startMenuPlagButton.addEventListener('click', function () {
    openDetector('start');
    startMenu.style.visibility = 'hidden';
    startButt.id = 'startButt';
});


// Function to add animation to progress bar

function progress() {
    document.getElementById('progressWindowDiv').style.display = 'block';
    document.getElementById('progress').className = 'animProgress';
    document.getElementById('fileButtonMenu').style.display = 'none';
    setTimeout(endProgress, 5000);
}

function endProgress() {
    document.getElementById('progressWindowDiv').style.display = 'none';
}