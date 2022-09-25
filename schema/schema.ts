import { JSONSchema7 } from "json-schema"

const userSchema: JSONSchema7 = {
    "title": "users",
    "type": "object",
    "required": [
        "firstname",
        "lastname",
        "email",
        "password",
    ],
    "properties": {
        "firstname": { "type": "string" },
        "lastname": { "type": "string" },
        "email": { "type": "string" },
        "password": { "type": "string"}
    }
}