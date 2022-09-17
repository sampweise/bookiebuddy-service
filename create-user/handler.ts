import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from "../types/types";
import { createUser } from "../database/usersDatabase";

const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        const user: User = req.body;
        const response = await createUser(user);
        context.res = {
            body: response
        };
    }
    catch (e)
    {
        console.log(e);
        context.res = {
            status: 500,
            body: e
        };
    }
};

export default handler;