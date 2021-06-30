import { getData } from '.';

const fetchSearchResults = async (query: string, filters?: { [k: string]: any }) => {
  // eslint-disable-next-line quotes

  const {data} = await getData(
    `api/search/${query.trim()}${
      filters ? `?${Object.entries(filters).map(([k, v]) => `${k}=${v}`)}` : ''
    }`
  );
  return data;
};
export default fetchSearchResults;
