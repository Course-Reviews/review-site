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
    const res = await postData(`api/posts/bycourse/${courseId}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }


  // return data;
};
export default postReview;
