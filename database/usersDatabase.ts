import { User } from "../types/types";
import { Context } from "@azure/functions";
import { InsertOneResult } from "mongodb";
import { connect } from "./utils";

export const createUser = async (user: User, context: Context): Promise<InsertOneResult<Document>> => { 
    context.log("Connecting to Database");
    try{
        const collection = await connect("authentication", "users");
        return await collection.insertOne(user);
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export const getUser = async (email: string, context: Context): Promise<Object> => {
    context.log("Connecting to Database");
    try {
        const collection = await connect("authentication", "users");
        context.log("Finding user: " + email);
        return await collection.findOne({email})
    }
    catch (e) {
        return Promise.reject(e);
    }
}