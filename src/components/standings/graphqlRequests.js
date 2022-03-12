import { request } from 'graphql-request';

const url = process.env.API_URL;

const MATCH_PAGE = `
 query paginatedMatches($pageNum: Int, $pageSize: Int){
   paginatedMatches(pageNum: $pageNum, pageSize: $pageSize) {
       total
       items {
        id
        seasonId
        groupDesc
        teamHome
        teamAway
        scoreHome
        scoreAway
        round
        date
      }
    }
  }`;

  export const queryPaginatedMatches = (pageNum, pageSize) => {
    return request(url, MATCH_PAGE, {pageNum, pageSize });
  };