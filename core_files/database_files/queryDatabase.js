const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/plagiarism_web');

// Function takes the main object of files and inserts them one by one into the table.

function insertFilesInDb(fileObject) {

    const columnNames = Object.keys(fileObject[0]).join(", ");

    for (let i = 0; i < fileObject.length; i++) {
        const fileValues = Object.keys(fileObject[i]).fill('?').join(", ");
        db.run('INSERT INTO files (' + columnNames + ') VALUES (' + fileValues + ')', Object.values(fileObject[i])), function (err) {
            if (err) {
                console.log(err);
            }
        };
    }
}

//  If needed for debugging, this function will just log all of the data in the table.

function selectAllFromDb(callback) {
    var arr = [];
    db.serialize(function () {
        db.each("SELECT * FROM files", function (err, row) {
            arr.push(row);
        }, function () {
            db.close();
            callback(arr);
        });
    });
}

function deleteAllFromDb() {
    db.all("DELETE FROM files", function (err) {
        if (err) { console.log(err.message) } else { console.log("Deleted") };
    });
}

//  Function to close the database whenever needed.

function closeDB() {

    db.close();
    console.log('Database connection closed.');
}

module.exports = { insertFilesInDb, selectAllFromDb, deleteAllFromDb };