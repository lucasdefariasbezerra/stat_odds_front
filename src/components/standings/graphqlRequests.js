import { request } from 'graphql-request';
import { buildGQLClient, getToken } from '../shared/gqlUtils';


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

const RESET_MATCH = `
mutation resetMatch($match:ScoreUpdatePayload) {
  resetMatch(match: $match) {
    status
    description
  }
}
`;

export const queryPaginatedMatches = (pageNum, pageSize, seasonId) => {
  const client = buildGQLClient(url, getToken());
  return client.request(MATCH_PAGE, { pageNum, pageSize, seasonId });
};

export const saveMatchesScore = (scoreList) => {
  debugger;
  const client = buildGQLClient(url, getToken());
  return client.request(UPDATE_SCORE, { scoreList });
};

export const resetMatch = (match) => {
  debugger;
  const client = buildGQLClient(url, getToken());
  return client.request(RESET_MATCH, { match });
}