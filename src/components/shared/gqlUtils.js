import { GraphQLClient } from 'graphql-request';

export const buildGQLClient = (url, token) => {
    const requestHeaders = {'Authorization': `bearer ${token}`};
    return new GraphQLClient(url, { headers: requestHeaders });
};

export const getToken = () => {
    return localStorage.getItem('odds-user-info');
};