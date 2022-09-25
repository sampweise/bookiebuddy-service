import { MongoClient } from "mongodb";

/*Build Base Backend Requirement 7:
    -Description: This functions connects with the mongodb database in the authorization user database
    -Author: Sam Weise
    -Created: 9/18/22
    -Revisions: 9/25/22-Sam Weise
    -Preconditions: (databaseName: string, collectionName: Context) database and collection name for the collection
                    you wish to connect to
    -Postconditions: (Promise<Collection<Document>>) which is promise containing the collection object
    -Errors: If the connection to the database fails or if the user send an incorrect payload the errors response
             is a 500
*/
export const connect = async (databaseName: string, collectionName: string) => {
    //Grab connection string environment variable
    const connectionString = process.env["bookiebuddydb"];
    //Connect to the monog cluster
    const cluster = await MongoClient.connect(connectionString);
    //Connect to the database specified in the args
    const database = cluster.db(databaseName)
    //Connect to the collection specified in the args
    const collection = database.collection(collectionName);
    //Return a resolved promise
    return Promise.resolve(collection);
}