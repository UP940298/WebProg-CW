var comparisonWindow = document.getElementById('comparisonWindow');
var windowsBarOpenWindow = document.createElement('div');
var windowName = document.createElement('span');
var startBar = document.getElementById('startBar');
var xButton = document.getElementById('comparisonWindowX');
var minButton = document.getElementById('comparisonWindow-');
var fileButton = document.getElementById('comparisonWindowFile');
var helpButton = document.getElementById('comparisonWindowHelp');
var startMenu = document.getElementById('startMenu');
let startButt = document.getElementById('startButt');
let startMenuPlagButton = document.getElementById('plagButton');

function openDetector(button) {

    windowName.id = "windowName";
    windowName.textContent = "Plagiarism Checker";
    windowsBarOpenWindow.appendChild(windowName);
    windowsBarOpenWindow.id = "openWindow";

    if (comparisonWindow.style.visibility == 'hidden') {
        comparisonWindow.style.visibility = 'visible';
    } else if (comparisonWindow.style.visibility == 'visible' && button == 'x' || button == '-') {
        comparisonWindow.style.visibility = 'hidden';
    }

    if (startBar.querySelector("#openWindow") == null) {
        startBar.appendChild(windowsBarOpenWindow);
    } else if (startBar.querySelector("#openWindow") != null && button == 'x') {
        startBar.removeChild(windowsBarOpenWindow);
    } else if (startBar.querySelector("#openWindow") != null && button == '-') {
        windowsBarOpenWindow.id = "minWindow";
    }
}

xButton.addEventListener('click', function () {
    openDetector('x');
});

minButton.addEventListener('click', function () {
    openDetector('-');
});

let fileMenu = document.getElementById('fileMenu');

fileButton.addEventListener('click', function () {
    if (fileMenu.style.visibility == 'hidden') {
        fileMenu.style.visibility = 'visible';
    } else {
        fileMenu.style.visibility = 'hidden';
    }
});

let help = document.getElementById('help');

helpButton.addEventListener('click', function () {
    if (help.style.visibility == 'hidden') {
        help.style.visibility = 'visible';
    } else {
        help.style.visibility = 'hidden';
    }
});

var totalNum = 0;

function printFiles(fileNum) {
    totalNum += fileNum;
    var fileCount = document.getElementById('fileCount');
    fileCount.innerHTML = totalNum + " file(s)";
}

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

function time() {
    var today = new Date();
    document.getElementById('time').innerHTML = today.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
    var timer = setTimeout(time, 1000);
}

startButt.addEventListener('click', function () {

    if (startMenu.style.visibility == 'hidden') {
        startMenu.style.visibility = 'visible';
        startButt.id = 'clickedStartButt';
    } else {
        startMenu.style.visibility = 'hidden';
        startButt.id = 'startButt';
    }
});

startMenuPlagButton.addEventListener('click', function () {
    comparisonWindow.style.visibility = 'visible';
    startMenu.style.visibility = 'hidden';
    startButt.id = 'startButt';
});