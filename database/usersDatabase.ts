import { User } from "../types/types";

export const createUser = (user: User): Promise<string> => { 
    console.log("Connecting to Database");
    return Promise.resolve("This has been called");
}