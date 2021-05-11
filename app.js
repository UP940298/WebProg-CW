const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('core_files'));

app.listen(8080);
