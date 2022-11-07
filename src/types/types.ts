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

export interface Team {
    tid: number;
    cid: number;
    did: number;
    region: string;
    name: string;
    abbrev: string;
    pop: number;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
}

export type UpdateUser = Omit<User, 'password'>;