import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getData } from "../src/database/sqlDatabase";
import { bearerStrategy } from "../src/middleware/bearerStrategy";

const getSqlData: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try{
        //Calls the token bearer strategy
        //await bearerStrategy(context, req);
        const results = getData(context);
        console.log("results: ");
        console.log(results);
        context.res = {
            body: results
        };
    }
    catch (e)
    {
        context.log(e);
        //Send the error message back to the endpoint
        context.res =   
        
        {
            status: e.code,
            body: e.message
        };
    }
};

export default getSqlData;