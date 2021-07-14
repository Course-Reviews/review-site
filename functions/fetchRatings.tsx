// Fetches all ratings for the user

import { getData } from '.';
import { FetchUserRatingsResponse } from '../dtos/FetchUserRatings';

const fetchRatings = async (): Promise<FetchUserRatingsResponse> => {
  const { data } = await getData('api/user/ratings');

  return data;
};
export default fetchRatings;
