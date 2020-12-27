import { request } from 'graphql-request';

const url = process.env.API_URL;
const TEAM_PAGE = `
 query paginatedTeams($pageNum: Int, $pageSize: Int){
   paginatedTeams(pageNum: $pageNum, pageSize: $pageSize) {
       total
       items {
        id
        name
        sport {
         id
         name
    }
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
    }
}`;

const SPORTS = `
  query sports {
    sports {
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
    return request(url, TEAM_PAGE, { pageNum, pageSize });
};

export const queryTeamDetails = (id) => {
  return request(url, TEAM_DETAILS, { id });
};

export const querySports = () => {
  return request(url, SPORTS);
};

export const updateTeams = (team) => {
  console.log('update team ', team);
  return request(url, UPDATE_TEAM, { team });
};

export const addTeam = (team) => {
  console.log('add team ', team);
  return request(url, ADD_TEAM, { team });
};