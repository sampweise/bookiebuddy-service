import { Collection, MongoClient } from "mongodb";
import { Connection } from "tedious";

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
export const connect = async (databaseName: string, collectionName: string): Promise<Collection<any>> => {
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

export const connectSql = (): Connection => {
    const config = {
        authentication: {
            options: {
                userName: "blakerichmeier",
                password: "Test123*"
            },
            type: "default"
        },
        server: "bookie-buddy-server.database.windows.net",
        options: {
            database: "BookieBuddyDB1",
            encrypt: true,
        }
    }
    const connection = new Connection(config);
    return connection;
}

export const getEnvironment = () => {
    return {
        adminToken: process.env['adminToken'],
        bookiebuddyService: process.env['bookiebuddyService']
    };
}