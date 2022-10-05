import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { userInfo } from "os";
import { getOrCreateToken } from "../src/database/tokenDatabase";
import { bearerStrategy } from "../src/middleware/bearerStrategy";


const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log("Getting or Creating a Token For: ", req.body.email);
    const { email, password } = req.body;
    try{
        //Calls the token bearer strategy
        await bearerStrategy(context, req);
        const token = await getOrCreateToken(email, password, context);
        context.res = {
            body: token
        }
    } catch (e) {
        context.res ={
            status: e.code,
            body: e.message
        }
    }
}

export default handler;