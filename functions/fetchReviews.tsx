import { getData } from '.';

export interface reviewResponse {
  _id: string;
  content: string;
  course_rating: number;
  delivery_rating: number;
  relaxed_rating: number;
  enjoyment_rating: number;
  createdAt: string;
  downvote: number;
  owner: string;
  taken_date: string;
  updatedAt: string;
  upvote: number;
  user_name?: string;
}
export interface fetchReviewsResponse {
  num_ratings: number;
  overall_rating: number;
  relaxed_rating: number;
  enjoyment_rating: number;
  delivery_rating: number;
  user_review_id?: string;
  reviews: reviewResponse[];
}

const fetchReviews = async (courseId: string): Promise<fetchReviewsResponse> => {
  const { data } = await getData(`api/posts/bycourse/${courseId}`);

  const reviews = (data).reviews.map((r: any) => ({
    enjoyment_rating: Math.max(r.content_rating - 1, 1),
    relaxed_rating:(5 - r.workload_rating) + 2,
    ...r
  }))

  return {...data, reviews};
};
export default fetchReviews;
