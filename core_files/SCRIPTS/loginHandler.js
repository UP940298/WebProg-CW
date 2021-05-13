var helpButton = document.getElementById('loginHelpButton');
var helpWindow = document.getElementById('loginHelp');
var userInput = document.getElementById('userLogin');
var passInput = document.getElementById('passLogin');
var loginButton = document.getElementById('login');


helpButton.addEventListener('click', function () {
    if (helpWindow.style.display == 'none') {
        helpWindow.style.display = 'block';
    } else {
        helpWindow.style.display = 'none';
    }
});

function stringToHash(string) {

    var hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}
