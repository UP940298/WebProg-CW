const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('plagiarism_web');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS files (chosen BOOLEAN, name CHAR(30), file BLOB)", function (err) {
        if (err) {
            console.log(err.message);
        }
        console.log('Table created');
    });

    db.all("SELECT * FROM files", function (err, rows) {
        rows.forEach(function (row) {
        });
    });
});

function takeFileObject(fileObject) {

    /*
    let q = "INSERT INTO files (chosen, name, file) VALUES (?,?,?)";

    let st = db.prepare(q);
    
        for (var i = 0; i < fileObject.length; i++) {
            st.run(fileObject[i], function (err) {
                if (err) {
                    console.log('err1: ' + err.message);
                }
            });
        }
        

    st.finalize();
*/

    /*
        const columns = Object.keys(fileObject[0]).join(", ");
    
        for (let i = 0; i < fileObject.length; i++) {
            const placeholder = Object.keys(fileObject[i]).fill('?').join(", ");
            db.run('INSERT INTO files (' + columns + ') VALUES (' + placeholder + ')', Object.values(fileObject[i])), (err) => {
                console.log(err.message);
            };
        }
        */

    db.all("SELECT * FROM files", function (err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        });
    });

    closeDB();
}

function closeDB() {

    db.close();
    console.log('Database connection closed.');
}

module.exports = { takeFileObject };