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

  const TOURNMENTS = `query tournments {
    tournments {
      id
      name
    }
  }`;


export const querySeasons = (pageNum, pageSize) => {
    return request(url, SEASON_PAGE, { pageNum, pageSize });
};

export const queryTournments = () => {
  return request(url, TOURNMENTS);
}

