import { getData } from '.';

export interface userReviewResponse {
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

export interface fetchUserReviewsResponse {
  reviews: userReviewResponse[];
}

const fetchUserReviews = async (courseId: string): Promise<fetchUserReviewsResponse> => {
  const { data } = await getData(`api/posts/bycourse/${courseId}`);

  const reviews = (data).reviews.map((r: any) => ({
    enjoyment_rating: Math.max(r.content_rating - 1, 1),
    relaxed_rating:(5 - r.workload_rating) + 2,
    ...r
  }))

  return {...data, reviews};
};
export default fetchUserReviews;
