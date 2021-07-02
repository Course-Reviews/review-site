import { getData } from '.';

const fetchReviews = async (courseId: number) => {
  // eslint-disable-next-line quotes
  const { data } = await getData(`api/posts/${courseId}`);
  console.log(data);

  return data;
};
export default fetchReviews;
