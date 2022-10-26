import { Context } from '@azure/functions';
import { Connection, Request } from 'tedious';
import { connectSql } from './utils';

export const getData = (context: Context) => {
    const connection = connectSql();
    connection.on("connect", (err) => {
        context.log('here');
        if(err) {
            context.log(err.message);
            throw Error();
        } else {
            //Write the query
        }
        connection.close();
    })
    connection.connect();
}