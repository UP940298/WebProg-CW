
/*
    Websocket script that starts a new socket route and sends the fileObject once it has been properly populated, sorted and cleaned after being uploaded.
    Sends the fileObject to app.js which sends it to compareFiles to be compared before being returned.
    Set to listen for messages being sent through the socket and activates after clicking the appropriate button.
*/

function sortFiles(fileObject) {
    const ws = new WebSocket("ws://" + window.location.hostname + ":8081/");
    ws.binaryType = 'arraybuffer';

    function toServer() {
        ws.send(JSON.stringify(fileObject));
    }

    function fromServer(event) {
        createReport(JSON.parse(event.data));
    }
    const runDetect = document.getElementById('runDetector');
    runDetect.addEventListener('click', function () {
        progress();
        setTimeout(toServer, 5000);
    });
    ws.addEventListener('message', fromServer);

}

function createReport(similarityArr) {

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
        //reportText.innerHTML += 'Name of file: ' + similarityArr[item].name + ' Similarity to main file: ' + similarityArr[item].similarity;
        let tempDiv = document.createElement('div');
        let tempNameSpan = document.createElement('span');
        let tempSimSpan = document.createElement('span');
        let tempNameText = document.createElement('p');
        let tempSimText = document.createElement('p');

        reportPage.appendChild(tempDiv);
        tempDiv.appendChild(tempNameSpan);
        tempDiv.appendChild(tempNameText);
        tempDiv.appendChild(tempSimSpan);
        tempDiv.appendChild(tempSimText);

        tempNameSpan.innerHTML = "Name of file: ";
        tempSimSpan.innerHTML = "Similarity to main file: ";
        tempNameText.innerHTML = similarityArr[item].name;
        tempSimText.innerHTML = (similarityArr[item].similarity).toFixed(3);

        tempDiv.id = 'reportTextDiv';
        tempNameSpan.id = 'reportTextFill';
        tempSimSpan.id = 'reportTextFill';
        tempNameText.id = 'reportTextFill';
        tempSimText.id = 'reportTextFill';
    }
}