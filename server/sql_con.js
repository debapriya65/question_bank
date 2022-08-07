import mysql from 'mysql';
var dbconfig={
    host: "localhost",
    user: "root",
    password: "",
    database: "project",
    multipleStatements: true
  }
export var   con=mysql.createConnection(dbconfig);