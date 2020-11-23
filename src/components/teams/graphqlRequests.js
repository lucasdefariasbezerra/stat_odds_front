import { request } from 'graphql-request';

const url = 'http://localhost:4000/graphql';
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

export const queryTeams = (pageNum, pageSize) => {
    return request(url, TEAM_PAGE, { pageNum, pageSize });
};

export const queryTeamDetails = (id) => {
  return request(url, TEAM_DETAILS, { id });
};

export const querySports = () => {
  return request(url, SPORTS);
};