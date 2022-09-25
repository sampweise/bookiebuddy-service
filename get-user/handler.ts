import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUser } from "../database/usersDatabase"

/*Build Base Backend Requirement 7:
    -This functions connects with the mongodb database in the authorization user database
     and then returns that information to the endpoint.
    -Cade Sarkin
    -Created: 9/20/22
    -Revisions: 9/21/22-Cade Sarkin, 9/25/22-Sam Weise
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns the information through the context
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        //Store email from url query param
        const email: string = req.query.email;
        console.log("email: ", email);
        //Call the getUser function and store the response 
        const response = await getUser(email, context);
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
            status: 500,
            body: e.message
        };
    }
};

export default handler;