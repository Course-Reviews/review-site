import Link from 'next/link';

import { FiSearch } from 'react-icons/fi';
import classNames from 'classnames';
import { codeToURL } from '../../util/util';
import React from 'react';
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
  <Link
    key={result.id}
    href={`/courses/${result.university}/${codeToURL(result.code)}`}
  >
    <a onClick={onClick}>
      <li
        className={`hover:bg-gray-100 flex items-center w-full justify-between py-2 my-2 px-4 ${className}`}
      >
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
      </li>
    </a>
  </Link>
);

export default SearchResult;
