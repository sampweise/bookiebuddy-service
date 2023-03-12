import { Context } from "@azure/functions"
import {getTeam} from "../src/database/teamDatabase";

const sgMail = require('@sendgrid/mail')

export const handler = async function (context: Context): Promise<void> {
    const teamArr = await getTeam(context, 'KAN');
    console.log(teamArr)
    // teamSchedule.forEach((obj)=> {
    //     console.log(obj.date) //date '2023-03-04T15:00:00-06:00'
    //     console.log(obj.time) //time central '15:00'
    //     console.log(obj.teams) /*teams {
    //            home: {
    //              id: 203,
    //              name: 'Texas',
    //              logo: 'https://media.api-sports.io/basketball/teams/203.png'
    //            },
    //            away: {
    //              id: 1959,
    //              name: 'Kansas',
    //              logo: 'https://media.api-sports.io/basketball/teams/1959.png'
    //            }
    //          } */

    // })
    //var date = teamSchedule[0]['parameters']['date']
    let latestDate = '';
    //var date_string = date.replace('-', '')
    //var dateInt = Number(date_string)
    var today = new Date().toISOString().slice(0, 10).replace('-', '')
    var todayInt = Number(today)

    //if(todayInt > dateInt){
        //latestDate = date;
        sgMail.setApiKey('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')

        var templateParams = {
            name: "Zack",
            message: "Testing 123"
        }
        var messageObj = {
            to: 'sampweise@gmail.com',
            from: 'bookiebuddycom@gmail.com',
            subject: 'New Match Coming Up!',
            html: `p><strong>Name:</strong>${templateParams.name}</p><p><strong>Message:</strong>${templateParams.message}</p>`
        }

        sgMail
            .send(messageObj)
            .then(() => {
                console.log('email sent')
            })
            .catch((error) => {
                console.error("Error: ", error)
            })
   // }

    context.res = {
        body: latestDate
    }
};

//to run every monday at 8 use this as the schedule '0 0 8 * * MON'