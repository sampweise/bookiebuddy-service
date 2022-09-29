import { Context } from "@azure/functions";
import { getUser } from "./usersDatabase";
import * as jwt from "jsonwebtoken";
import { connect } from "./utils";
import { Token } from "../types/types";
import { Collection } from "mongodb";

export const getOrCreateToken = async (email: string, password: string, context: Context): Promise<string> => {
    try{
        const user = await getUser(email, context);
        if(user.password === password) {
            const collection: Collection<Token> = await connect('authentication', 'tokens');
            const result = await collection.findOne({email});
            if(result?.token) {
                return Promise.resolve(result.token);
            } else {
                const newToken = jwt.sign(
                    { email },
                    process.env['jwt_secret'],
                )
                const tokenReq = {
                    email,
                    token: newToken
                };
                collection.insertOne({email, token: newToken})
                return Promise.resolve(newToken);
            }
        } else {
            return Promise.reject({code: 401, message: "Unauthorized"});
        }
    } catch (e) {
        context.log(e.message);
        return Promise.reject(e);
    }
}