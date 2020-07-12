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

export const queryTeams = (pageNum, pageSize) => {
    console.log('query teams');
    return request(url, TEAM_PAGE, { pageNum, pageSize });
};