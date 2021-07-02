import { getData, getDataServerside } from '.';

// this fetches literally every single course in the databse
const fetchCourse = async (uni: string, code: string) => {
  const { data } = await getDataServerside(`api/courses?uni=${uni}&code=${code}`);
  return data;

};
export default fetchCourse;
