require('dotenv').config();
const mysql = require('mysql2');
const { PrismaClient} = require('@prisma/client');

// const connectMysql = (password) => { //Versão antiga, talvez eu volte a usar
//     const connection = mysql.createConnection({
//         host: '127.0.0.1',
//         port: 3306,
//         user: 'root',
//         password: password
//     });

//     connection.connect((error) => {
//         if (error) {
//             return console.error('MySQL database connection error: ' + error.message);
//         } else {
//             return console.log('MySQL database connection successful');
//         }
//     });
// }



module.exports = connectMysql;
