const sqlite3 = require('sqlite3').verbose();

async function init() {
    let db = new sqlite3.Database('plagiarism_web', (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('Connected');
    });
    return db;
}

const dbConn = init();