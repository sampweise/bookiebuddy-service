import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { UpdateUser, User } from "../src/types/types";
import { createUser, updateUser } from "../src/database/usersDatabase";
import { bearerStrategy } from "../src/middleware/bearerStrategy";

/*Build Base Backend Requirement 32:
    -This functions connects with the mongodb database in the authorization user database
     and then updates a user based on the payload sent accross
    -Sam Weise
    -Created: 11/4/22
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns the information through the context
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
const createUserHandler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Updating user for: ', req.body.email);
    try{
        //Calls the token bearer strategy
        await bearerStrategy(context, req);
        //Store user sent across the payload
        const user: UpdateUser = req.body;
        //Call the updateUser database function
        const response = await updateUser(user, context);
        //Send the response back
        context.res = {
            body: response
        };
    }
    catch (e)
    {
        context.log(e);
        //Send the error message back to the endpoint
        context.res = {
            status: e.code,
            body: e.message
        };
    }
};

export default createUserHandler;