import { request } from 'graphql-request';

const url = 'http://localhost:4000/graphql';
const TEAM_QUERY = `
    query {
        teams {
            id
            name
            sport {
                name
            }
        }
    }`;

export const queryTeams = () => {
    return request(url, TEAM_QUERY);
};