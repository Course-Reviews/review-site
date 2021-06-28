import Head from 'next/head';

import React, { ChangeEvent, useState } from 'react';
import { useRef } from 'react';
import { FiSearch, FiFilter, FiInfo } from 'react-icons/fi';
import UniTag from '../components/UniTag';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import UniFilter from '../components/UniFilter';
import SearchResult from '../components/SearchResult';
export interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const searchInput = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState<string>('');

  const [filter, setFilter] = useState<{
    list: string[];
    show: boolean;
  }>({ list: [], show: false }); // Todo only filters by university right now
  const [searchResults, setSearchResults] = useState<{
    loaded: boolean;
    list: Uni[];
  }>({ list: [], loaded: true });

  const router = useRouter();
  // Landing page contains the search where users will primarily select courses to view.
  // Todo For SEO, might need content to have needed keywords and stuff (could be latest posts etc.)

  const toMobileSearch = async () => {
    // * On mobile we use the modal instead so need to un-focus from this input to prevent typing behind modal
    // * On desktop we just use this page
    console.log(isMobile);
    if (!isMobile) {
      return;
    }
    router.push('./search/MobileSearch');
  };

  const results = [
    { id: '1', name: 'SOFTENG 351', uni: 'UoA' },
    { id: '2', name: 'SOFTENG 351', uni: 'Massey' },
    { id: '3', name: 'SOFTENG 351', uni: 'VIC' },
    { id: '4', name: 'SOFTENG 351', uni: 'AUT' },
  ];

  const universities: string[] = ['UoA', 'Massey', 'AUT', 'VIC', 'Otago'];

  return (
    <main className='container mx-auto my-auto md:h-5/6 md:flex md:flex-col md:w-full md:justify-center md:items-center'>
      <section className='container flex flex-col '>
        <h1 className='text-center font-semibold py-4 '>Search your courses for reviews</h1>
        <div className='container mx-auto my-auto  py-2 w-5/6 md:max-w-md  bg-white flex justify-between items-center border  rounded-full shadow-sm '>
          <div className=' container px-4 flex items-center text-primary-900 bg-white rounded-full'>
            <FiSearch />
            <input
              type='text'
              className='px-2 focus:outline-none w-full'
              value={searchValue}
              onFocus={toMobileSearch}
              ref={searchInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.currentTarget.value)
              }
            />
          </div>
          <div className='px-4 text-primary-900 border-l border-primary-900 border-opacity-40'>
            <button onClick={() => !isMobile && setFilter({ ...filter, show: !filter.show })}>
              <FiFilter />
            </button>
          </div>
        </div>
      </section>
      <section
        className='w-1/4   my-4 mx-auto '
        style={{ display: filter.show ? 'block' : 'none' }}
      >
        {/* //Todo add transition/animation to dropping down
         */}
        <span className='text-sm text-gray-700'>Filter by:</span>

        <UniFilter list={universities} state={filter} action={setFilter} />
      </section>
      <section className='w-1/3 md:w-1/2 xl:px-20 md:px-10 xl:w-2/5 mx-auto text-center'>
        {searchResults.loaded && (
          <ul>
            {results.map((result) => (
              <SearchResult result={result} key={result.id} />
            ))}
          </ul>
        )}
        {!searchResults.loaded && <span>Loading...</span>}
        {searchResults.loaded && !searchResults.list.length && (
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
    </main>
  );
};

export default Landing;
