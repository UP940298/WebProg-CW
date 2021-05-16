const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const ws = require('ws');
const compare = require('./core_files/SCRIPTS/compareFiles');

app.use(express.static(__dirname + '/core_files'));


const server = http.createServer(app);

function listener(socket) {
    socket.on('message', function (event) {
        var fileObject = compare.compareFiles(event);

        console.log("app: " + fileObject);
        socket.send(JSON.stringify(fileObject));
    });
}

const wsServer = new ws.Server({ server: server });
wsServer.on('connection', listener);

server.listen(8081);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/core_files/HTML/loginPage.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/core_files/HTML/mainPage.html');
});

app.listen(8080, () => {
    console.log('Connected to server. Listening on 8080.');
});