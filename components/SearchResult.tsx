import Link from 'next/link';
import UniTag from './UniTag';
import { FiSearch } from 'react-icons/fi';
import classNames from 'classnames';

export type Uni = {
  id: string;
  name: string;
  uni: string;
};

export interface SearchResultProps {
  result: Uni;
  isCondensed?: boolean;
  className?: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, className, isCondensed }) => (
  <Link key={result.id} href={`/courses/${result.uni}/${result.name.replace(' ', '')}`}>
    <a>
      <li
        className={`hover:bg-gray-100 flex items-center w-full justify-between py-2 my-2 px-4   ${className}`}
      >
        <div className='flex items-center'>
          {!isCondensed && (
            <div className='text-primary-900 '>
              <FiSearch />
            </div>
          )}
          <span className='px-2 font-semibold uppercase'>{result.name}</span>
        </div>
        <div className='w-1/4 text-right'>
          <UniTag uni={result.uni} />
        </div>
      </li>
    </a>
  </Link>
);

export default SearchResult;
