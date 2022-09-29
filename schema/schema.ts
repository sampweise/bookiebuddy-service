import { JSONSchema7 } from "json-schema"

/*Build Base Backend Requirement 7:
    -This the schema for out users in our mongodb to ensure that the payloads sent to our database hold a certain shape
    -Cade Sarkin
    -Created: 9/25/22
    -Revisions: 9/28/22-Sam Weise
*/
const userSchema: JSONSchema7 = {
    title: "users",
    type: "object",
    required: [
        "firstname",
        "lastname",
        "email",
        "password",
    ],
    properties: {
        firstname: { 
            type: "string" 
        },
        lastname: {
            type: "string" 
        },
        email: { 
            type: "string" 
        },
        password: { 
            type: "string"
        }
    }
}

/*Create Token Database-Requirement 23:
    -This the schema for our tokens in our mongodb to ensure that the payloads sent to our database hold a certain shape
    -Cade Sarkin
    -Created: 9/25/22
    -Revisions: 9/28/22-Sam Weise
*/
const tokenSchema: JSONSchema7 = {
    title: "tokens",
    type: "object",
    required: [
        "email",
        "token",
    ],
    properties: {
        email: { 
            type: "string" 
        },
        token: {
            type: "string" 
        }
    }
}