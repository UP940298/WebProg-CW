/*
    Websocket script that starts a new socket route and sends the fileObject once it has been properly populated, sorted and cleaned after being uploaded.
    Sends the fileObject to app.js which sends it to compareFiles to be compared before being returned.
    Set to listen for messages being sent through the socket and activates after clicking the appropriate button.
*/

function sortFiles(fileObject) {
    const ws = new WebSocket("ws://" + window.location.hostname + ":8081/");
    ws.binaryType = 'arraybuffer';

    console.log(fileObject);

    function toServer() {
        ws.send(JSON.stringify(fileObject));
    }

    function fromServer(event) {
        createReport(JSON.parse(event.data));
    }

    const runDetectorHTML = document.getElementById('runDetector');
    runDetectorHTML.addEventListener("click", toServer);
    ws.addEventListener("message", fromServer);

}

function createReport(similarityArr) {

    console.log(similarityArr);

    let report = document.createElement('div');
    document.body.appendChild(report);
    report.id = 'reportWindow';

    let reportBar = document.createElement('span');
    document.getElementById('reportWindow').appendChild(reportBar);
    reportBar.id = 'reportWindowBar';

    let reportPage = document.createElement('div');
    document.getElementById('reportWindow').appendChild(reportPage);
    reportPage.id = 'reportWindowPage';

    let reportText = document.createElement('p');
    document.getElementById('reportWindowPage').appendChild(reportText);
    reportText.id = 'reportText';

    for (let item in similarityArr) {
        reportText.innerHTML += 'name: ' + similarityArr[item].name + ' text: ' + similarityArr[item].similarity;
        reportText.innerHTML += '\n';
    }
}