import { Context } from '@azure/functions';
import { Collection, ConnectionClosedEvent } from 'mongodb';
import { Connection, Request } from 'tedious';
import { connectSql } from './utils';
const sql = require('mssql')

export const getData = async (context: Context) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=tcp:bookie-buddy-server.database.windows.net,1433;Initial Catalog=BookieBuddyDB1;Persist Security Info=False;User ID=blakerichmeier;Password=Test123*;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30');
        const result = await sql.query`SELECT * FROM [dbo].[sentiment_analysis] WHERE ID='1585066251469979648'`;
        console.dir(result);
        return Promise.resolve(result.dataset);
    } catch (err) {
        console.log(err);
    }
}

// export const getData = (context: Context) => {
//     const connection = connectSql();
//     connection.on("connect", (err) => {
//         if(err) {
//             context.log(err.message);
//             throw Error();
//         } else {
//             queryDatabase();
//         }
//     })

//     connection.connect();

//     var results = [];

//     function queryDatabase() {
//         console.log("Reading rows from the Table...");

//         // Read all rows from table
//         const request = new Request(
//             `SELECT * FROM [dbo].[sentiment_analysis] WHERE ID='1585066251469979648'`,
//           (err, rowCount, rows) => {
//             if (err) {
//                 console.log('error');
//                 console.error(err.message);
//             } else {
//               console.log(`${rowCount} row(s) returned`);
//             }
//           }
//         );

//         request.on("row", columns => {
//             columns.forEach(column => {
//               results.push(column.value);
//             });
//           });

//         connection.execSql(request);
//     }
//     return (results);
// }