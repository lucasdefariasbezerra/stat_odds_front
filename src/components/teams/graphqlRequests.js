import { request } from 'graphql-request';
import { buildGQLClient, getToken } from '../shared/gqlUtils';

const url = process.env.API_URL;
const TEAM_PAGE = `
 query paginatedTeams($pageNum: Int, $pageSize: Int){
   paginatedTeams(pageNum: $pageNum, pageSize: $pageSize) {
       total
       items {
        id
        name
      }
    }
  }`;

const TEAM_DETAILS = `
  query teamDetails($id: ID) {
    team(id: $id) {
      id
      name
      sport {
        id
        name
      }
      country {
        id
        name
        threeLetterCode
      }
    }
}`;

const SPORTS = `
  query sports {
    sports {
      id
      name
    }
}`;

const COUNTRIES = `query countries{
  countries {
    id
    name
  }
}`;

const UPDATE_TEAM = `
mutation updateTeams($team:teamRequestPayload) {
  updateTeams(teamPayload:$team) {
    status
    description
  }
}
`;

const ADD_TEAM = `
mutation addTeam($team:teamRequestPayload) {
  addTeam(teamPayload:$team) {
    status
    description
  }
}
`;

export const queryTeams = (pageNum, pageSize) => {
    const client = buildGQLClient(url, getToken());
    return client.request(TEAM_PAGE, { pageNum, pageSize });
};

export const queryTeamDetails = (id) => {
  const client = buildGQLClient(url, getToken());
  return client.request(TEAM_DETAILS, { id });
};

export const querySports = () => {
  const client = buildGQLClient(url, getToken());
  return client.request(SPORTS);
};

export const queryCountries = () => {
  const client = buildGQLClient(url, getToken());
  return client.request(COUNTRIES);
};

export const updateTeams = (team) => {
  const client = buildGQLClient(url, getToken());
  return client.request(UPDATE_TEAM, { team });
};

export const addTeam = (team) => {
  const client = buildGQLClient(url, getToken());
  return client.request(ADD_TEAM, { team });
};