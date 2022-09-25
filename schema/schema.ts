const userSchema: (JsonSchema7) = {
    "title": "users",
    "required": [
        "_id",
        "firstname",
        "lastname",
        "email",
        "password",
    ],
    "properties": {
        "_id": { "bsonType": "objectId" },
        "firstname": { "bsonType": "string" },
        "lastname": { "bsonType": "string" },
        "email": { "bsonType": "string" },
        "password": { "bsonType": "string"}
    }
}