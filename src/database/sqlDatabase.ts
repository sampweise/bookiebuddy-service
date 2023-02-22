import { Context } from '@azure/functions';
const sql = require('mssql')

//This function will connect to our sql database and return the tweets for a given team,
//these tweets will then be aggragated and return and average sentiment score
export const getData = async (context: Context, team: string) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        //const pool = new sql.ConnectionPool('Server=tcp:bookie-buddy-server.database.windows.net,1433;Initial Catalog=BookieBuddyDB1;Persist Security Info=False;User ID=blakerichmeier;Password=Test123*;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30');
        const queryRequest = 'SELECT * FROM [dbo].[tweets] t1, [dbo].[' + team +'] t2 WHERE t1.ID = t2.ID'
        await sql.connect('Server=tcp:bookie-buddy-server.database.windows.net,1433;Initial Catalog=BookieBuddyDB1;Persist Security Info=False;User ID=blakerichmeier;Password=Test123*;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30');
        const result = await sql.query(queryRequest);
        let score = 0
        let count = 0 
        result.recordset.map((obj) => {
            const {analysis, ID, ...rest} = obj;
            if(rest.subjectivity != 0) {
                count += 1
                score += parseFloat(rest.polarity)
                console.log(rest.polarity)
            }
        }) 
        const sentimentScore = (score/count)*100
        return sentimentScore
    } catch (err) {
        console.log(err);
    }
}
