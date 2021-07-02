import { postData } from '.';

interface reviewData {
  course_rating: number;
  content_rating: number;
  workload_rating: number;
  delivery_rating: number;
  content?: string;
  taken_date: string;
}

const postReview = async (courseId: string, data: reviewData) => {
  try {
    const res = await postData(`api/posts/${courseId}/`, data);
    console.log(res);
  } catch (e) {
    console.log(e);
  }

  console.log(data);

  // return data;
};
export default postReview;
