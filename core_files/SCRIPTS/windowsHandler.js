var comparisonWindow = document.getElementById('comparisonWindow');
var windowsBarOpenWindow = document.createElement('div');
var windowName = document.createElement('span');
var startBar = document.getElementById('startBar');
var xButton = document.getElementById('comparisonWindowX');
var minButton = document.getElementById('comparisonWindow-');

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
})

startBar.addEventListener('click', function () {
    openDetector('start');
});

var totalNum = 0;

function printFiles(fileNum) {
    totalNum += fileNum;
    var fileCount = document.getElementById('fileCount');
    fileCount.innerHTML = totalNum + " file(s)";
}