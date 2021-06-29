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
  <Link key={result.id} href='#' passHref>
    <li
      className={classNames(
        'flex items-center w-full justify-between my-4 rounded-full',
        isCondensed ? 'px-1 py-0.5' : 'px-4 py-3',
        className
      )}
    >
      <div className='flex items-center'>
        {!isCondensed && (
          <div className='text-primary-900'>
            <FiSearch />
          </div>
        )}
        <span className='px-2 font-semibold uppercase'>{result.name}</span>
      </div>
        <UniTag uni={result.uni} className='w-1/4'/>
    </li>
  </Link>
);

export default SearchResult;
