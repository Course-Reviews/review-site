import { getData } from '.';
import { FetchUserReviewsResponse } from '../dtos/FetchUserReviews';

const fetchUserReviews = async (): Promise<FetchUserReviewsResponse> => {
  const { data } = await getData('api/user/reviews');

  return data;
};
export default fetchUserReviews;
