import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FiSearch, FiFilter, FiInfo } from 'react-icons/fi';
import Expand from './atom/Expand';
import Ripple from './atom/Ripple';
import SearchResult, { Uni } from './SearchResult';
import UniFilter from './UniFilter';
import Loader from './Loader';
import fetchSearchResults from '../functions/fetchSearchResults';
import Link from 'next/link';
import { MixpanelConsumer } from 'react-mixpanel';

interface CourseSearchProps {}

const CourseSearch: React.FC<CourseSearchProps> = ({}) => {
  // const [filter, setFilter] = useState<{
  //   value: string;
  //   show: boolean;
  // }>({ value: 'uoa', show: false }); // Todo only filters by university right now

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchResults, setSearchResults] = useState<{
    loaded: boolean;
    list: Uni[];
  }>({ list: [], loaded: true });
  const [searchValue, setSearchValue] = useState<string>('');
  const [showUI, setShowUI] = useState<boolean>(false);
  // const universities: string[] = ['UoA', 'Massey', 'AUT', 'VIC', 'Otago'];
  const [timeout, setTime] = useState(null);

  const delayedSearch = (value: string, mixpanel: any) => {
    // if (!showUI) {
    // setShowUI(true);
    // }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef?.current.addEventListener('keyup', function (e) {
        clearTimeout(timeout);
        setShowUI(false);
        const time = setTimeout(() => {
          setShowUI(true);

          fetchSearchResults({
            searchValue: inputRef.current.value,
            state: searchResults,
            action: setSearchResults,
            filter: 'uoa',
          });
          // console.log('Value:', inputRef.current.value);

          // mixpanel.track('Search Course', { value: event.currentTarget.value });
        }, 1000);
        setTimeout(time);
      });
    }
  }, []);

  return (
    <>
      <section className='container flex flex-col rounded-full relative'>
        <h1 className='text-center font-semibold py-4'>Search reviews for your courses</h1>
        <Ripple
          className={'w-5/6 md:max-w-md mx-auto bg-white rounded-full '}
          grow
          rippleClassName={'bg-primary-200'}
          rippleContainerClassName='rounded-full'
        >
          <div className='focus-within:ring-4 focus-within:ring-primary-300 pl-4 my-auto flex items-center border rounded-full shadow-lg relative z-10'>
            <FiSearch size={20} />
            <MixpanelConsumer>
              {(mixpanel: any) => (
                <input
                  type='text'
                  className='px-2 focus:outline-none w-full py-2 bg-transparent'
                  autoFocus
                  ref={inputRef}
                  placeholder='ACCTG 102'
                  // value={searchValue}
                  onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    const value = event.key;

                    setSearchValue(value);

                    // delayedSearch(value, mixpanel);
                  }}
                />
              )}
            </MixpanelConsumer>
            <div
              className={`${
                showUI && inputRef.current.value.length > 0 && !searchResults.loaded
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
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
      </section>
      {/* <Expand expanded={filter.show} className='w-2/3 xl:w-1/4 md:w-2/5  my-4 mx-auto'>
        {/* //Todo add transition/animation to dropping down
         }
        <div>
          <span className='text-sm text-gray-700'>Filter by:</span>
          <UniFilter list={universities} state={filter} action={setFilter} />
        </div>
      </Expand>
      */}
      <section className='mt-2 w-5/6 xl:px-24 sm:w-5/6 md:w-1/2  2xl:w-3/12 xl:w-5/12 mx-auto text-center h-96'>
        <Expand expanded={searchResults.loaded} className='w-full  my-4 mx-auto'>
          {searchResults.loaded && (
            <ul className='w-full bg-white shadow-lg rounded-lg'>
              {searchResults.list.map((result) => (
                <SearchResult
                  result={result}
                  key={result.id}
                  isCondensed={false}
                  className='bg-white'
                />
              ))}
            </ul>
          )}
        </Expand>

        {showUI &&
          inputRef.current?.value.length > 0 &&
          searchResults.loaded &&
          searchResults.list.length < 1 && (
            <div className='bg-white shadow rounded-lg py-2 '>
              <span>No results.</span>
              <div className='flex items-center flex-col my-4 '>
                <div className='my-4'>
                  <FiInfo size='20' />
                </div>
                <span>Is your course not here?</span>
                <span className='text-info-600 my-2'>Please tell us!</span>
              </div>
            </div>
          )}
        <Link href='/courses'>
          <a className='text-center pt-4 font-bold'>Browse All Courses</a>
        </Link>
      </section>
    </>
  );
};

export default CourseSearch;
