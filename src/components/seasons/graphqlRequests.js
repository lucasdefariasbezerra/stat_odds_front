import { request } from 'graphql-request';

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
    return request(url, SEASON_PAGE, { pageNum, pageSize });
};

export const queryTournments = () => {
  return request(url, TOURNMENTS);
};

export const addSeason = (season) => {
  return request(url, ADD_SEASON, { season });
};

export const querySeasonById = (id) => {
  return request(url, SEASON_DETAILS, { id });
};
