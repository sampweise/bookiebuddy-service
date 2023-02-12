import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { grabTeamSchedule } from "../../bookiebuddy-web/src/services/sportService";
import { bearerStrategy } from "../src/middleware/bearerStrategy";
import {getTeam} from "../../bookiebuddy-web/src/services/teamService";
import {getUser} from "../../bookiebuddy-web/src/services/userService";
import emailjs from "@emailjs/browser";

const handler: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try{
        //not sure what query param actually looks like here
        //Calls the token bearer strategy
        await bearerStrategy(context, req);
        //Call the grabTeamSchedule function and store the response 
        const userResponse = await getUser(context);
        const teamResponse = await getTeam(context);
        console.log(userResponse, teamResponse);
        //Return the response to the end point
        //might need to do that in the above comment
        var templateParams = {
            email: 'zanzilla@ku.edu',
            firstName: "Zack",
            team: teamResponse
        }
    
        emailjs.send('service_ab4049v', 
                        'template_2qxtsqn',
                        templateParams);
    }
    catch (e)
    {
        context.log(e.message);
        //Return a 500 error with the body being the error message returned.
        context.res = {
            status: e.code,
            body: e.message
        };
    }
};

export default handler;