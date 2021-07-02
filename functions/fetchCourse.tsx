import { getData } from '.';

// this fetches literally every single course in the databse
const fetchCourses = async () => {
  const { data } = await getData('api/courses');

  console.log(data);

};
export default fetchCourses;
