import { getData } from '.';
import courseList from '../util/courseList.json'
import { codeToURL, URLToCode } from '../util/util';
const fetchSearchResults = async (query: string, filters?: { [k: string]: any }) => {

  let res = (courseList as string[]).filter(f => f.includes(codeToURL(query))).sort() || []

  if(res.length > 5){
    res = res.slice(0, 5);
  }

  const data = res.map(i => URLToCode(i));

  // Serverside search
  // const { data } = await getData(
  //   `api/search/${query.trim()}${
  //     filters ? `?${Object.entries(filters).map(([k, v]) => `${k}=${v}`)}` : ''
  //   }`
  // );

  return data;
};
export default fetchSearchResults;
