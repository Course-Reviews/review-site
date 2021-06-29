import Link from 'next/link';
import UniTag from './UniTag';
import { FiSearch } from 'react-icons/fi';

export type Uni = {
  id: string;
  name: string;
  uni: string;
};

export interface SearchResultProps {
  result: Uni;
}

const SearchResult: React.FC<SearchResultProps> = (props) => (
  <Link key={props.result.id} href='#' passHref>
    <li className='flex items-center w-full justify-between py-3 my-4 px-4 bg-gray-100 rounded-full'>
      <div className='flex items-center'>
        <div className='text-primary-900 '>
          <FiSearch />
        </div>
        <span className='px-2 font-semibold'>{props.result.name}</span>
      </div>
      <div className='w-1/4'>
        <UniTag uni={props.result.uni} />
      </div>
    </li>
  </Link>
);

export default SearchResult;
