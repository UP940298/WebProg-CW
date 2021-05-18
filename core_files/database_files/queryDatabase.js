const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/plagiarism_web');

// Function takes the main object of files and inserts them one by one into the table.

function insertFilesInDb(fileObject) {

    /*
        const columnNames = Object.keys(fileObject[0]).join(", ");
    
        for (let i = 0; i < fileObject.length; i++) {
            const fileValues = Object.keys(fileObject[i]).fill('?').join(", ");
            db.run('INSERT INTO files (' + columnNames + ') VALUES (' + fileValues + ')', Object.values(fileObject[i])), (err) => {
                console.log(err.message);
            };
        }
        */
}

//  If needed for debugging, this function will just log all of the data in the table.

function selectAllFromDb() {
    db.all("SELECT * FROM files", function (err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        });
    });
}

//  Function to close the database whenever needed.

function closeDB() {

    db.close();
    console.log('Database connection closed.');
}

module.exports = { insertFilesInDb, selectAllFromDb };