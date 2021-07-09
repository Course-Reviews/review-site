import classNames from 'classnames';
import mixpanel from 'mixpanel-browser';
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { FiInfo, FiSearch } from 'react-icons/fi';
import { MixpanelConsumer } from 'react-mixpanel';
import fetchSearchResults from '../functions/fetchSearchResults';
import Expand from './atom/Expand';
import Ripple from './atom/Ripple';
import Loader from './Loader';
import SearchResult, { CourseSearchResult } from './SearchResult';

interface CourseSearchProps extends HTMLAttributes<HTMLElement> {}

// This is how long we should wait after each keypress before actually executing the search
const SEARCH_DELAY = 50;

// Dont search until the user has typed at least this many characters
const SEARCH_LENGTH_THRESHOLD = 1;

const CourseSearch: React.FC<CourseSearchProps> = ({ className, onClick }) => {
  // When we do a search cache the results in a map
  // * We might want to think abt making sure the cache doesnt exceed a certain number of entries but it should be fine
  const cache = useRef(new Map());

  // Stores a list of search results
  const [searchResults, setSearchResults] = useState<CourseSearchResult[]>([]);

  // The value of the users current search
  const [searchValue, setSearchValue] = useState<string>('');

  // Tracks if the search is in the loading state
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
        cache.current.set(searchValue, res);
        setSearchResults(res);
        setLoading(false);
      }, SEARCH_DELAY);
    }
  }, [searchValue]);

  return (
    <div className={classNames('w-full md:max-w-xl mb-2 mx-auto px-8 h-16', className)}>
      {/* <h1 className='text-center font-semibold py-4'>Search reviews for your courses</h1> */}
      <section className='container flex flex-col rounded-full relative'>
        <Ripple
          className={'bg-white rounded-full '}
          grow
          rippleClassName={'bg-primary-200'}
          rippleContainerClassName='rounded-full'
        >
          <div className='focus-within:ring-4 focus-within:ring-primary-500 pl-6 my-auto flex items-center border rounded-full shadow-lg relative z-10'>
            <FiSearch size={24} className={'text-primary-600'} strokeWidth={3} />
            <MixpanelConsumer>
              {(mixpanel: any) => (
                <input
                  type='text'
                  className='px-6 focus:outline-none w-full py-4 bg-transparent text-xl'
                  autoFocus
                  placeholder='ACCTG 102'
                  value={searchValue}
                  onChange={(e) => {
                    mixpanel.track('[LANDING] Searching', { value: e.target?.value });
                    setSearchValue(e.target?.value || '');
                  }}
                />
              )}
            </MixpanelConsumer>
            <div className={loading ? 'opacity-100' : 'opacity-0'}>
              <Loader className='mx-4' />
            </div>
            {/* <button
              onClick={() => setFilter({ ...filter, show: !filter.show })}
              className={classNames(
                filter.show ? 'text-primary-500' : 'text-primary-900',
                'px-3  border-l border-primary-900 border-opacity-40'
              )}
            >
              <FiFilter size={20} />
            </button> */}
          </div>
        </Ripple>
        <div className='mt-2 text-center inset-x-0 absolute top-16 z-10'>
          <Expand
            expanded={searchValue.length >= SEARCH_LENGTH_THRESHOLD}
            className='w-full mx-auto shadow-xl rounded-lg'
          >
            <ul className='w-full bg-white '>
              {searchResults.length > 0 ? (
                searchResults.map((result, i) => (
                  <SearchResult
                    onClick={(e: any) => {
                      mixpanel.track('[LANDING] Course Clicked', { value: result.code });
                      onClick && onClick(e);
                    }}
                    result={result}
                    key={i}
                    isCondensed={false}
                    className='bg-white'
                  />
                ))
              ) : (
                <div className='bg-white shadow rounded-lg py-2 '>
                  <span>No results.</span>
                  <div className='flex items-center flex-col my-4 '>
                    <div className='my-4'>
                      <FiInfo size='20' />
                    </div>
                    <span>Is your course not here?</span>
                    <MixpanelConsumer>
                      {(mixpanel: any) => (
                        <span
                          className='text-info-600 my-2'
                          onClick={() => {
                            mixpanel.track('[LANDING] course not found', { value: searchValue });
                          }}
                        >
                          Please tell us!
                        </span>
                      )}
                    </MixpanelConsumer>
                  </div>
                </div>
              )}
            </ul>
          </Expand>
        </div>
      </section>
      {/* <Expand expanded={filter.show} className='w-2/3 xl:w-1/4 md:w-2/5  my-4 mx-auto'>
        <div>
          <span className='text-sm text-gray-700'>Filter by:</span>
          <UniFilter list={universities} state={filter} action={setFilter} />
        </div>
      </Expand>
      */}
    </div>
  );
};

export default CourseSearch;
