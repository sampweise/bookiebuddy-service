import { Context } from "@azure/functions";
import { getUser } from "./usersDatabase";
import * as jwt from "jsonwebtoken";
import { connect } from "./utils";
import { Token } from "../types/types";
import { Collection } from "mongodb";

/*Build Base Backend Requirement 24:
    -This functions is called all the logic of connecting to the database and if the user has a token it returns it 
    if not the token will be created with the jwt library if the email and password match a user in our database
    -Sam Weise
    -Created: 9/28/22
    -Preconditions: (context: Context, req: HttpRequest) the context for the function and the request sent across
    -Postconditions: (Promise<void>) because the function returns a resolve if true and reject if false
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500, if the user is unauthorized it returns a 401 Unauthorized
*/

export const getOrCreateToken = async (email: string, password: string, context: Context): Promise<string> => {
    try{
        context.log('Checking for existing user');
        //First it checks if the user exists
        const user = await getUser(email, context);
        //If the user exists and matches the password sent across enter this logic
        if(user?.password === password) {
            context.log("Connecting to Database");
            //Connect to the token collection
            const collection: Collection<Token> = await connect('authentication', 'tokens');
            //Try to find a token with the given email
            const result = await collection.findOne({email});
            //If the token exists enter this logic
            if(result?.token) {
                context.log('Token found!');
                //Return a resovle with the token
                return Promise.resolve(result.token);
            } else {
                context.log("Creating new token for ", email);
                //Create a new token with the secret in environment
                const newToken = jwt.sign(
                    { email },
                    process.env['jwt_secret'],
                )
                //Create the token request to send to the database
                const tokenReq = {
                    email,
                    token: newToken
                };
                //Insert the token request object
                collection.insertOne(tokenReq)
                //Return the new token
                return Promise.resolve(newToken);
            }
        } else {
            //If the password doesn't match then the user is unauthorized
            return Promise.reject({code: 401, message: "Unauthorized"});
        }
    } catch (e) {
        //All other errors are sent with a reject and logged
        context.log(e.message);
        return Promise.reject(e);
    }
}