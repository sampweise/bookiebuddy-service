//Base user type
export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface Token {
    email: string;
    token: string;
}