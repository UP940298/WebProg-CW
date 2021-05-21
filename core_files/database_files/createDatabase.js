const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/plagiarism_web');

/*
    Start a new instance of the sqlite database.
    Create a table called files (if it doesn't exist).
    Output all of the contents of the table (for debug purposes).
    This is run with "npm run setup" to setup the table ready for querying.
*/

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS files (user CHAR(30), chosen BOOLEAN, name CHAR(30), file BLOB)", function (err) {
        if (err) {
            console.log(err.message);
        }
        console.log('Table created');
    });

    db.all("SELECT * FROM files", function (err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        });
    });
});
