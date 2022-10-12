import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getOrCreateToken } from "../src/database/tokenDatabase";
import { bearerStrategy } from "../src/middleware/bearerStrategy";

/*Build Base Backend Requirement 24:
    -This functions connects with the mongodb database in the authorization token database
     and then creates a token if one doesn't exist, but if it does exists return that token
     attached with the email
    -Sam Weise
    -Created: 9/28/22
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns the information through the context
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/

const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log("Getting or Creating a Token For: ", req.body.email);
    //Grab the email and password off the request body
    const { email, password } = req.body;
    try{
        //Calls the token bearer strategy
        await bearerStrategy(context, req);
        //Call the getOrCreateToken Helper functions
        const token = await getOrCreateToken(email, password, context);
        //Returns the token back to the endpoint
        context.res = {
            body: token
        }
    } catch (e) {
        //If an error occurs send the code and message
        context.res ={
            status: e.code,
            body: e.message
        }
    }
}

export default handler;