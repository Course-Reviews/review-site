import Link from 'next/link';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { codeToURL } from '../../util/util';
import UniTag from './UniTag';

export type CourseSearchResult = {
  id: string;
  code: string;
  university: string;
};

export interface SearchResultProps {
  result: CourseSearchResult;
  isCondensed?: boolean;
  className?: string;
  onClick?: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, className, isCondensed, onClick }) => (
  <li
    className={`hover:bg-gray-100 py-2 my-2 px-4 ${className}`}
    onClick={onClick}
  >
    <Link href={`/courses/${result.university}/${codeToURL(result.code)}`}>
      <a  className={'flex items-center w-full justify-between'}>
        <div className='flex items-center'>
          {!isCondensed && (
            <div className='text-primary-800'>
              <FiSearch />
            </div>
          )}
          <span className='px-2 font-semibold uppercase text-gray-800'>{result.code}</span>
        </div>
        <div className='w-1/4 text-right'>
          <UniTag uni={result.university} />
        </div>
      </a>
    </Link>
  </li>
);

export default SearchResult;
