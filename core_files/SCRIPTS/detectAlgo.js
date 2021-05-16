function sortFiles(fileObject) {
    const ws = new WebSocket("ws://" + window.location.hostname + ":8081/");
    ws.binaryType = 'arraybuffer';

    console.log(fileObject);

    function toServer() {
        ws.send(JSON.stringify(fileObject));
    }

    function fromServer(e) {
        console.log("detect: " + JSON.parse(e.data));
    }

    const a = document.getElementById('a');
    a.addEventListener("click", toServer);
    ws.addEventListener("message", fromServer);

}