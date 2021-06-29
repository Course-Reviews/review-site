import React, { ChangeEvent, useState } from 'react';
import { FiFeather, FiSearch } from 'react-icons/fi';
import fetchSearchResults from '../functions/fetchSearchResults';
import Ripple from './atom/Ripple';
import Loader from './Loader';
import SearchResult, { Uni } from './SearchResult';
export interface NavSearchProps {}

const NavSearch: React.FC<NavSearchProps> = () => {
  const [searchResults, setSearchResults] = useState<{
    loaded: boolean;
    list: Uni[];
  }>({ list: [], loaded: true });

  const [focused, setFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div
      className={` transition-width bg-gray-100 ${
        focused ? 'w-2/3' : 'w-1/4  md:w-1/3'
      } flex items-center hover:w-2/3  rounded-full
      `}
    >
      <Ripple
        className={'w-full md:max-w-md mx-auto '}
        grow
        rippleClassName={'bg-primary-200'}
        rippleContainerClassName='rounded-full'
      >
        <div className='flex items-center w-full'>
          <div className='pl-3'>
            <FiSearch size={20} />
          </div>
          <input
            className='px-2 focus:outline-none w-full py-2  bg-transparent'
            onFocus={() => setFocused(true)}
            value={searchValue}
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
          <ul className='absolute mt-11 pl-3 bg-white rounded-lg w-full py-1 shadow'>
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
