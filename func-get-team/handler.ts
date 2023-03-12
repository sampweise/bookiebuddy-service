import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getTeam } from "../src/database/teamDatabase";
import { bearerStrategy } from "../src/middleware/bearerStrategy";

/*Build Base Backend Requirement 41:
    -This functions connects with the mongodb database in the college teams database
    and returns a teams data
    -Cade Sarkin
    -Created: 11/6/22
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns the information through the context
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        //Calls the token bearer strategy
        await bearerStrategy(context, req);
        //Grabbing region
        const { school } = req.query;
        console.log(school)
        //Call the getUser function and store the response 
        const response = await getTeam(context, school);
        //Return the response to the end point
        context.res = {
            body: response
        };
    }
    catch (e)
    {
        context.log(e.message);
        //Return a 500 error with the body being the error message returned.
        context.res = {
            status: e.code,
            body: e.message
        };
    }
};

export default handler;