import classNames from 'classnames';
import React, { ChangeEvent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import fetchSearchResults from '../functions/fetchSearchResults';
import Expand from './atom/Expand';
import Ripple from './atom/Ripple';
import Loader from './Loader';
import SearchResult, { CourseSearchResult, Uni } from './SearchResult';

// This is how long we should wait after each keypress before actually executing the search
const SEARCH_DELAY = 500;

// Dont search until the user has typed at least this many characters
const SEARCH_LENGTH_THRESHOLD = 2;

const NavSearch: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const [searchResults, setSearchResults] = useState<CourseSearchResult[]>([]);
  const cache = useRef(new Map());

  const [focused, setFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  // const universities: string[] = ['UoA', 'Massey', 'AUT', 'VIC', 'Otago'];

  // The timer tracks how long it has been since the user has typed
  const timer = useRef(0);

  // Side effect of searchValue changing
  useEffect(() => {
    window.clearTimeout(timer.current);
    // Cancel the search if it is too short
    if (searchValue.length < SEARCH_LENGTH_THRESHOLD) {
      return setLoading(false);
    }

    // first attempt to get result from cache to save api calls
    if (cache.current.has(searchValue)) {
      setLoading(false);
      setSearchResults(cache.current.get(searchValue));
    } else {
      setLoading(true);
      timer.current = window.setTimeout(async () => {
        // if we get to this point then we do the actual search
        const res = await fetchSearchResults(searchValue);
        setSearchResults(res);
        setLoading(false);
      }, SEARCH_DELAY);
    }
  }, [searchValue]);

  return (
    <div
      className={classNames(
        'transition-width bg-gray-100 flex items-center rounded-full',
        focused ? 'w-72' : 'w-48',
        className
      )}
    >
      <Ripple
        className={'w-full md:max-w-md mx-auto '}
        grow
        rippleClassName={'bg-primary-200'}
        rippleContainerClassName='rounded-full'
      >
        <div className='flex items-center w-full relative z-10'>
          <div className='pl-3'>
            <FiSearch size={20} />
          </div>
          <input
            className='px-2 focus:outline-none w-full py-2  bg-transparent'
            onFocus={() => setFocused(true)}
            value={searchValue}
            placeholder='Search Courses'
            onChange={(e) => setSearchValue(e.target?.value || '')}
            onBlur={() => !searchValue.length && setFocused(false)}
          />
          {loading && <Loader className='mx-4' />}
        </div>

        <Expand
          expanded={searchValue.length >= SEARCH_LENGTH_THRESHOLD}
          className='absolute mt-12 px-2 bg-transparent rounded-lg w-full py-1 shadow-lg text-gray-700 transition-height'
        >
          {focused && searchValue.length > 0 && (
            <ul className='w-full py-1 shadow-lg  bg-white '>
              {!loading ? (
                searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <SearchResult result={result} key={result.id} isCondensed />
                  ))
                ) : (
                  <div className={'py-2 my-2 px-4'}>No Results</div>
                )
              ) : (
                <div className={'py-2 my-2 px-4'}>Loading...</div>
              )}
            </ul>
          )}
        </Expand>
      </Ripple>
    </div>
  );
};

export default NavSearch;
