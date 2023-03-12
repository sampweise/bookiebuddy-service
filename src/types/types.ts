//Base user type
export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    team: string;
}

export interface Token {
    email: string;
    token: string;
}

export interface Team {
    TeamID: number;
    Key: string;
    Active: boolean;
    School: string;
    Name: string;
    ApRank: number;
    Wins: number;
    Losses: number;
    ConferenceWins: number;
    ConferenceLosses: number;
    GlobalTeamID: number;
    ConferenceID: number;
    Conference: string;
    TeamLogoUrl: string;
    ShortDisplayName: string;
    Stadium: Stadium;
}

interface Stadium {
    StadiumID: number;
    Active: boolean;
    Name: string;
    Address: string;
    City: string;
    State: string;
    Zip: number;
    Country: string;
    Capacity: number;
    GeoLat: number;
    GeoLong: number;
}

export type UpdateUser = Omit<User, 'password'>;