import { getData } from '.';
import { fetchCoursesResponse } from '../pages/api/courses/filter';

interface fetchCoursesRequest {
  stage?: number;
  term?: number;
  faculty?: number;
  page?: number;
}

// this fetches literally every single course in the databse
const fetchCourses = async (options: fetchCoursesRequest): Promise<fetchCoursesResponse> => {
  const url = `api/courses/filter?${Object.entries(options).filter(([k, v]) => v !== undefined).map(([k, v]) => `${k}=${v}`).join('&')}`

  const { data } = await getData(url);

  return data;
};
export default fetchCourses;
