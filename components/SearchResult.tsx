import Link from 'next/link';
import UniTag from './UniTag';
import { FiSearch } from 'react-icons/fi';
import classNames from 'classnames';

export type CourseSearchResult = {
  id: string;
  code: string;
  uni: string;
};

export interface SearchResultProps {
  result: CourseSearchResult;
  isCondensed?: boolean;
  className?: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, className, isCondensed }) => (
  <Link key={result.id} href={`/courses/${result.uni}/${result.code.replace(' ', '').toLowerCase()}`}>
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
          <span className='px-2 font-semibold uppercase'>{result.code}</span>
        </div>
        <div className='w-1/4 text-right'>
          <UniTag uni={result.uni} />
        </div>
      </li>
    </a>
  </Link>
);

export default SearchResult;
