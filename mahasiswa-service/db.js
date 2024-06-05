const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '35.226.50.99',
    user: 'root',
    password: '7X5=A5&A$R+lMUm]',
    database: 'perpustakaan'
});

connection.connect(err => {
    if (err) throw err;
    console.log('MySQL connected.');
});

module.exports = connection;
