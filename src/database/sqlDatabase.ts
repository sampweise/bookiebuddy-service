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
        let sortedResults = combinedResult.sort(
            (p1, p2) => (p1.subjectivity < p2.subjectivity) ? 1 : (p1.subjectivity > p2.subjectivity) ? -1 : 0);
        return Promise.resolve(sortedResults);
    } catch (err) {
        console.log(err);
    }
}
