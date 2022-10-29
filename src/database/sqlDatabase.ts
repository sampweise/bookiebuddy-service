import { Context } from '@azure/functions';
const sql = require('mssql')

export const getData = async (context: Context) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=tcp:bookie-buddy-server.database.windows.net,1433;Initial Catalog=BookieBuddyDB1;Persist Security Info=False;User ID=blakerichmeier;Password=Test123*;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30');
        const result = await sql.query`SELECT * FROM [dbo].[sentiment_analysis]`;
        let combinedResult = [];
        result.recordset.map((obj) => {
            const {analysis, ID, ...rest} = obj;
            combinedResult.push(rest);
        }) 
        return Promise.resolve(combinedResult);
    } catch (err) {
        console.log(err);
    }
}
