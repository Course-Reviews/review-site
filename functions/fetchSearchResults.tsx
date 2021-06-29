import { SetStateAction } from 'react';
import { getData } from '.';
import { Uni } from '../components/SearchResult';

const fetchSearchResults = async (arg: {
  searchValue: string;
  state: { list: Uni[]; loaded: boolean };
  action: React.Dispatch<SetStateAction<any>>;
  filter: string;
}) => {
  // eslint-disable-next-line quotes
  arg.action({ ...arg.state, loaded: false });
  const data = await getData(`api/search/${arg.searchValue.trim()}?uni=${arg.filter}`);
  arg.action({ ...arg.state, list: data.data, loaded: true });
};
export default fetchSearchResults;
