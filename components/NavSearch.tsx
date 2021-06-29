import classNames from 'classnames';
import React, { ChangeEvent, HTMLAttributes, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import fetchSearchResults from '../functions/fetchSearchResults';
import Ripple from './atom/Ripple';
import Loader from './Loader';
import SearchResult, { Uni } from './SearchResult';

const NavSearch: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const [searchResults, setSearchResults] = useState<{
    loaded: boolean;
    list: Uni[];
  }>({ list: [], loaded: true });

  const [focused, setFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

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
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchValue(event.currentTarget.value);
              fetchSearchResults({
                searchValue: event.currentTarget.value,
                state: searchResults,
                action: setSearchResults,
                filter: 'uoa', // Todo in the future add a simple filter
              });
            }}
            onBlur={() => !searchValue.length && setFocused(false)}
          />
          {!searchResults.loaded && <Loader className='mx-4' />}
        </div>
        {focused && searchValue.length > 0 && (
          <ul className='absolute mt-12 pl-4 bg-white rounded-lg w-full py-1 shadow-lg text-gray-700 transition-height'>
            {searchResults.loaded ? (
              searchResults.list.length > 0 ? (
                searchResults.list.map((result) => (
                  <SearchResult result={result} key={result.id} isCondensed />
                ))
              ) : (
                <span>No results.</span>
              )
            ) : (
              <span>Loading...</span>
            )}
          </ul>
        )}
      </Ripple>
    </div>
  );
};

export default NavSearch;
