import { request, GraphQLClient } from 'graphql-request';
import { buildGQLClient } from '../shared/gqlUtils';

const url = process.env.API_URL;

const USER = `query {
    userInfo {
        id
        username
    }
}`;

export const userInfo = (token) => {
    return buildGQLClient(url, token).request(USER);
};