import { getData } from '.';
import { fetchCoursesResponse } from '../pages/api/courses/filter';

interface fetchCoursesRequest {
  uni?: string;
  stage?: number;
  page?: number;
}

// this fetches literally every single course in the databse
const fetchCourses = async (options: fetchCoursesRequest): Promise<fetchCoursesResponse> => {
  const url = `api/courses/filter?${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&')}`

  const { data } = await getData(url);

  return data;
};
export default fetchCourses;
