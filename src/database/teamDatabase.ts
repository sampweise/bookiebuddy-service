/*Build Base Backend Requirement 32:
    -Descripion: This functions connects with the mongodb database in the college teams database to get
    the teams 
    -Author: Sam Weise
    -Created: 9/18/22
    -Revisions: 9/25/22-Sam Weise
    -Preconditions: (user: User, context: Context) in the body payload sent accross, context for logging
    -Postconditions: (Promise<Team>) which is a promise containing an object defined by the mongodb api
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/

import { Context } from "@azure/functions";
import { Collection } from "mongodb";
import { Team } from "../types/types";
import { connect } from "./utils";

export const getTeams = async (context: Context): Promise<Array<Team>> => { 
    try{
        context.log("Connecting to Database");
        //Connecting to authorization data and user collection and storing that collection
        const collection: Collection<Team> = await connect("college", "teams");
        //Calling the insertOne function with the user passed in the payload
        const teamArr: Array<Team> = await collection.find({}).toArray();
        return Promise.resolve(teamArr);
    }
    catch (e) {
        //If there is an error throw the error back up
        return Promise.reject(e);
    }
}

export const getTeam = async (context: Context, region: String): Promise<Array<Team>> => { 
    try{
        context.log("Connecting to Database");
        //Connecting to authorization data and user collection and storing that collection
        const collection: Collection<Team> = await connect("college", "teams");
        //Calling the insertOne function with the user passed in the payload
        const teamArr: Array<Team> = await collection.find({region}).toArray();
        return Promise.resolve(teamArr);
    }
    catch (e) {
        //If there is an error throw the error back up
        return Promise.reject(e);
    }
}