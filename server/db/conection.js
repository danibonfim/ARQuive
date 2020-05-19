const mysql = require('mysql');

const conection = mysql.createConnection({
    password: "animal11",
    user: "root",
    database: "escritorio",
    host: "localhost",
    port: "3306"
});

module.exports = conection;
