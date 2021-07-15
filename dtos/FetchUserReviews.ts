import { ReviewData } from '../types/config'

export interface UserReviewResponse {
  id: string;
  content: string;
  course_rating: number;
  delivery_rating: number;
  relaxed_rating: number;
  enjoyment_rating: number;
  createdAt: string;
  votes: number;
  taken_date: string;
  user_name?: string;
}

export type FetchUserReviewsResponse = {
    review: UserReviewResponse;
    code: string;
    title: string;
    university: string;
}[]

export const toReviewData = (review: UserReviewResponse): ReviewData => ({
  id: review.id,
  content: review.content,
  rating: review.course_rating,
  enjoymentRating: review.enjoyment_rating,
  relaxedRating: review.relaxed_rating,
  deliveryRating: review.delivery_rating,
  timeTaken: review.taken_date,
  votes: review.votes,
  dateCreated: new Date(review.createdAt),
  username: review.user_name,
})