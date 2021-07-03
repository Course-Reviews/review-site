import { getData } from '.';

// this fetches literally every single course in the databse
const fetchAllCourses = async () => {
  const { data } = await getData('api/courses');

  // console.log(data);

};
export default fetchAllCourses;
