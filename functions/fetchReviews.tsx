import { getData } from '.';


export interface reviewResponse {
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
export interface fetchReviewsResponse {
  no_of_ratings: number
   overall_rating: number,
   reviews: reviewResponse[]

}

const fetchReviews = async (courseId: string): Promise<fetchReviewsResponse> => {
  const { data } = await getData(`api/posts/bycourse/${courseId}`);
  return data;
};
export default fetchReviews;
