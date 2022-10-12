import { Context, HttpRequest } from "@azure/functions";
import { connect } from "../database/utils";

/*Build Base Backend Requirement 24:
    -This functions is called before any logic in our handlers and checks the token given in the request
    to see if the user is authorized to make the call
    -Sam Weise
    -Created: 9/28/22
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns a resolve if true and reject if false
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500, if the user is unauthorized it returns a 401 Unauthorized
*/

export const bearerStrategy = async (context: Context, req: HttpRequest): Promise<void> => {
    //Split the authorization header to isolate the token
    const token = req.headers.authorization?.split(' ')[1];
    context.log('Authenticating token: ', token);
    //Connect to the token collection
    const collection = await connect("authentication", "tokens");
    //Call the findOne function to see if the token exist
    const result = await collection.findOne({token});
    //If the token exist it will return a resolve if not it will reject with a 401 Unauthorized
    return result ? Promise.resolve() : Promise.reject({code: 401, message: "Unauthorized"});
}