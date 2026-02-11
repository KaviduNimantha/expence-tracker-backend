const mysql = require('mysql2')
require('dotenv').config(); 

 let connection;

 function getConnection(){
    if(!connection){
        connection= mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }
    return connection;
 }

 module.exports ={
    getConnection
 }