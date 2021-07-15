import { postData } from '.';

interface reviewData {
  relaxed_rating: number;
  enjoyment_rating: number;
  delivery_rating: number;
  content?: string;
  taken_date: string;
  user_id?: string;
  user_name?: string;
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
