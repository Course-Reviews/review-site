import { getData } from '.';

interface fetchReviewsResponse {
  _id: string;
  content: string;
  course_rating: number;
  delivery_rating: number;
  workload_rating: number;
  content_rating: number;
  createdAt: string;
  downvote: number;
  owner: string;
  taken_date: string;
  updatedAt: string;
  upvote: number;
}

const fetchReviews = async (courseId: string): Promise<fetchReviewsResponse[]> => {
  const { data } = await getData(`api/posts/${courseId}`);
  return data;
};
export default fetchReviews;
