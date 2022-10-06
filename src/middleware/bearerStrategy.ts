import { Context, HttpRequest } from "@azure/functions";
import { connect } from "../database/utils";

export const bearerStrategy = async (context: Context, req: HttpRequest): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    context.log('Authenticating token: ', token);
    const collection = await connect("authentication", "tokens");
    const result = await collection.findOne({token});
    return result ? Promise.resolve() : Promise.reject({code: 401, message: "Unauthorized"});
}