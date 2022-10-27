import { Context } from '@azure/functions';
import { ConnectionClosedEvent } from 'mongodb';
import { Connection, Request } from 'tedious';
import { connectSql } from './utils';

export const getData = (context: Context) => {
    let returnString = "";
    const connection = connectSql();
    connection.on("connect", (err) => {
        if(err) {
            context.log(err.message);
            throw Error();
        } else {
            returnString = queryDatabase();
        }
        connection.close();
    })

    connection.connect();

    function queryDatabase() {
        console.log("Reading rows from the Table...");

        // Read all rows from table
        const request = new Request(
            `SELECT * FROM [dbo].[sentiment_analysis] WHERE ID='1585066251469979648'`,
          (err, rowCount) => {
            if (err) {
                console.log('error');
              console.error(err.message);
            } else {
              console.log(`${rowCount} row(s) returned`);
            }
          }
        );
        connection.execSql(request);
        return("hi");
      }

      return(returnString);
}