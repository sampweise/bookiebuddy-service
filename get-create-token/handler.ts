import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { userInfo } from "os";
import { getOrCreateToken } from "../database/tokenDatabase";


const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log("Getting or Creating a Token For: ", req.body.email);
    const { email, password } = req.body;
    try{
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