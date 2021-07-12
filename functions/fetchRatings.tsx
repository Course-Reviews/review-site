// Fetches all ratings for the user

import { getData } from '.';

export interface fetchRatingsResponse {
  [postId: string]: boolean
}

const fetchRatings = async (): Promise<fetchRatingsResponse> => {
  const { data } = await getData('api/user/ratings');

  return data;
};
export default fetchRatings;
