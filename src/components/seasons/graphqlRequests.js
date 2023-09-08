import { buildGQLClient, getToken } from '../shared/gqlUtils';

const url = process.env.API_URL;
const SEASON_PAGE = `
 query paginatedSeasons($pageNum: Int, $pageSize: Int){
   paginatedSeasons(pageNum: $pageNum, pageSize: $pageSize) {
        total
        items {
          id
          name
          type
          description
          seasonDate
      }
    }
  }`;

  const SEASON_DETAILS = `
  query seasonDetails($id: ID) {
    season(id: $id) {
      id
      name
      type
      description
      seasonDate
    }
}`;

  const TOURNMENTS = `query tournments {
    tournments {
      id
      name
    }
  }`;

const ADD_SEASON = `
  mutation addSeason($season:seasonRequestPayload) {
    addSeason(seasonPayload:$season) {
      status
      description
    }
}`;

export const querySeasons = (pageNum, pageSize) => {
  const client = buildGQLClient(url, getToken());
  return client.request(SEASON_PAGE, { pageNum, pageSize });
};

export const queryTournments = () => {
  const client = buildGQLClient(url, getToken());
  return client.request(TOURNMENTS);
};

export const addSeason = (season) => {
  const client = buildGQLClient(url, getToken());
  return client.request(ADD_SEASON, { season });
};

export const querySeasonById = (id) => {
  const client = buildGQLClient(url, getToken());
  return client.request(SEASON_DETAILS, { id });
};
