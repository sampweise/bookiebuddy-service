import { MongoClient } from "mongodb";

export const connect = async (databaseName: string, collectionName: string) => {
    const connectionString = process.env["bookiebuddydb"];
    console.log(connectionString);
    const cluster = await MongoClient.connect(connectionString);
    const database = cluster.db(databaseName)
    const collection = database.collection(collectionName);
    return Promise.resolve(collection);
}