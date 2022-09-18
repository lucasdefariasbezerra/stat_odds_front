import { request } from 'graphql-request';

const url = process.env.API_URL;

const MATCH_PAGE = `
 query paginatedMatches($pageNum: Int, $pageSize: Int, $seasonId: Int){
   paginatedMatches(pageNum: $pageNum, pageSize: $pageSize, seasonId: $seasonId) {
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
        processed
      }
    }
  }`;

const UPDATE_SCORE = `
mutation updateScores($scoreList:[ScoreUpdatePayload]) {
  updateScores(scoreUpdatePayload:$scoreList) {
    status
    description
  }
}
`;

export const queryPaginatedMatches = (pageNum, pageSize, seasonId) => {
  return request(url, MATCH_PAGE, { pageNum, pageSize, seasonId });
};

export const saveMatchesScore = (scoreList) => {
  return request(url, UPDATE_SCORE, { scoreList });
};