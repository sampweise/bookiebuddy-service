import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUser } from "../src/database/usersDatabase"
import { getEnvironment } from "../src/database/utils";
import { bearerStrategy } from "../src/middleware/bearerStrategy";

/*Build Base Backend Requirement 35:
    -This functions returns the environment variables to then use in the front end
    -Cade Sarkin
    -Created: 9/20/22
    -Revisions: 9/21/22-Cade Sarkin, 9/25/22-Sam Weise, 9/28/22-Sam Weise
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns the information through the context
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        context.log("Grabbing environment variables");
        //Call the getUser function and store the response 
        const response = getEnvironment();
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