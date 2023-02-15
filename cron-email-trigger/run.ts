import { Context } from "@azure/functions"
import {getTeam} from "../src/database/teamDatabase";

const handler = async function (context: Context): Promise<void> {
    const teamResponse = await getTeam(context, 'Kansas');
    console.log(teamResponse);

    //Return the response to the end point
    //might need to do that in the above comment
    var templateParams = {
        email: 'zanzilla@ku.edu',
        firstName: "Zack",
    }

    console.log('send email')
};

export default handler;