import { UpdateUser, User } from "../types/types";
import { Context } from "@azure/functions";
import { Collection, InsertOneResult, UpdateResult } from "mongodb";
import { connect } from "./utils";

/*Build Base Backend Requirement 7:
    -Descripion: This functions connects with the mongodb database in the authorization user database
     and then creates a user based on the payload sent accross
    -Author: Sam Weise
    -Created: 9/18/22
    -Revisions: 9/25/22-Sam Weise
    -Preconditions: (user: User, context: Context) in the body payload sent accross, context for logging
    -Postconditions: (Promise<InsertOneResult<Document>>) which is a promise containing an object defined by the mongodb api
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
export const createUser = async (user: User, context: Context): Promise<User> => { 
    try{
        context.log("Connecting to Database");
        //Connecting to authorization data and user collection and storing that collection
        const collection = await connect("authentication", "users");
        //Calling the insertOne function with the user passed in the payload
        context.log(user);

        await collection.insertOne(user);

        return user;
    }
    catch (e) {
        //If there is an error throw the error back up
        return Promise.reject(e);
    }
}

/*Build Base Backend Requirement 7:
    -Description: This functions connects with the mongodb database in the authorization user database
     and then returns that information to the endpoint.
    -Author: Cade Sarkin
    -Created: 9/18/22
    -Revisions: 9/25/22-Sam Weise
    -Preconditions: (email: string, context: Context) email for the user needed to be returned, context for logging
    -Postconditions: (Promise<Object>) which is promise containing the User object returned from the collection
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
export const getUser = async (email: string, context: Context): Promise<User> => {
    try {
        context.log("Connecting to Database");
        //Connecting to authorization data and user collection and storing that collection
        const collection: Collection<User> = await connect("authentication", "users");
        context.log("Finding user: " + email);
        //Calling the findOne function with the email passed in the query string
        const result: User = await collection.findOne({email});
        return result ? Promise.resolve(result) : Promise.reject({code: 404, message: "User Not Found"});
    }
    catch (e) {
        //If there is an error throw the error back up
        return Promise.reject(e);
    }
}

/*Build Base Backend Requirement 32:
    -Descripion: This functions connects with the mongodb database in the authorization user database
     and then updates a user based on the payload sent accross
    -Author: Sam Weise
    -Created: 9/18/22
    -Revisions: 9/25/22-Sam Weise
    -Preconditions: (user: User, context: Context) in the body payload sent accross, context for logging
    -Postconditions: (Promise<UpdateResult>) which is a promise containing an object defined by the mongodb api
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
export const updateUser = async (user: UpdateUser, context: Context): Promise<UpdateResult> => { 
    try{
        context.log("Connecting to Database");
        //Connecting to authorization data and user collection and storing that collection
        const collection = await connect("authentication", "users");
        //Calling the insertOne function with the user passed in the payload
        context.log(user);
        return await collection.updateOne({email: user.email},{$set: user});
    }
    catch (e) {
        //If there is an error throw the error back up
        return Promise.reject(e);
    }
}
