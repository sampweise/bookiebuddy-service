import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUser } from "../database/usersDatabase"

const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        const email: string = req.query.email;
        console.log("email: ", email);
        const response = await getUser(email, context);
        context.res = {
            body: response
        };
    }
    catch (e)
    {
        context.log(e);
        context.res = {
            status: 500,
            body: e
        };
    }
};

export default handler;