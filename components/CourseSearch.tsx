import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { FiSearch, FiFilter, FiInfo } from 'react-icons/fi';
import Expand from './atom/Expand';
import Ripple from './atom/Ripple';
import SearchResult, { Uni } from './SearchResult';
import UniFilter from './UniFilter';
import { Uni } from './SearchResult';
import Loader from './Loader';
import fetchSearchResults from '../functions/fetchSearchResults';

interface CourseSearchProps {}

const CourseSearch: React.FC<CourseSearchProps> = ({}) => {
  const [filter, setFilter] = useState<{
    value: string;
    show: boolean;
  }>({ value: 'uoa', show: false }); // Todo only filters by university right now
  const [searchResults, setSearchResults] = useState<{
    loaded: boolean;
    list: Uni[];
  }>({ list: [], loaded: true });
  const [searchValue, setSearchValue] = useState<string>('');
  const universities: string[] = ['UoA', 'Massey', 'AUT', 'VIC', 'Otago'];

  // Todo is condensed

  return (
    <>
      <section className='container flex flex-col '>
        <h1 className='text-center font-semibold py-4'>Search your courses for reviews</h1>
        <Ripple
          className={'w-5/6 md:max-w-md mx-auto bg-white '}
          grow
          rippleClassName={'bg-primary-200'}
          rippleContainerClassName='rounded-full'
        >
          <div className='focus-within:ring-4 focus-within:ring-primary-300 pl-4 my-auto flex items-center border rounded-full shadow-lg relative z-10'>
            <FiSearch size={20} />
            <input
              type='text'
              className='px-2 focus:outline-none w-full py-2 bg-transparent'
              autoFocus
              value={searchValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSearchValue(event.currentTarget.value);
                fetchSearchResults({
                  searchValue: event.currentTarget.value,
                  state: searchResults,
                  action: setSearchResults,
                  filter: filter.value,
                });
              }}
            />
            {!searchResults.loaded && <Loader className='mx-4' />}
            <button
              onClick={() => setFilter({ ...filter, show: !filter.show })}
              className={classNames(
                filter.show ? 'text-primary-500' : 'text-primary-900',
                'px-3  border-l border-primary-900 border-opacity-40'
              )}
            >
              <FiFilter size={20} />
            </button>
          </div>
        </Ripple>
      </section>
      <Expand expanded={filter.show} className='w-2/3 xl:w-1/4 md:w-2/5  my-4 mx-auto'>
        {/* //Todo add transition/animation to dropping down
         */}
        <div>
          <span className='text-sm text-gray-700'>Filter by:</span>
          <UniFilter list={universities} state={filter} action={setFilter} />
        </div>
      </Expand>
      <section className='w-5/6 xl:px-24 sm:w-5/6 md:w-1/2  xl:w-2/5 mx-auto text-center'>
        {searchResults.loaded && (
          <ul className='w-full'>
            {searchResults.list.map((result) => (
              <SearchResult
                result={result}
                key={result.id}
                isCondensed={false}
                className='bg-gray-100'
              />
            ))}
          </ul>
        )}

        {searchValue.length > 0 && searchResults.loaded && searchResults.list.length < 1 && (
          <div>
            <span>No results.</span>
            <div className='flex items-center flex-col my-4'>
              <div className='my-4'>
                <FiInfo size='20' />
              </div>
              <span>Is your course not here?</span>
              <span className='text-info-600 my-2'>Please tell us!</span>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CourseSearch;
