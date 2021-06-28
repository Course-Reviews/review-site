import { ChangeEvent, useRef, useState } from 'react';
import { FiSearch, FiFilter, FiArrowLeft, FiInfo } from 'react-icons/fi';
import Link from 'next/link';
import UniTag from '../../components/UniTag';
import UniFilter from '../../components/UniFilter';
import SearchResult from '../../components/SearchResult';

const MobileSearch: React.FC = ({}) => {
  const results = [
    { id: '1', name: 'SOFTENG 351', uni: 'UoA' },
    { id: '2', name: 'SOFTENG 351', uni: 'Massey' },
    { id: '3', name: 'SOFTENG 351', uni: 'VIC' },
    { id: '4', name: 'SOFTENG 351', uni: 'AUT' },
  ];

  type Uni = {
    id: string;
    name: string;
    uni: string;
  };

  const universities: string[] = ['UoA', 'Massey', 'AUT', 'VIC', 'Otago'];

  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<{
    list: string[];
    show: boolean;
  }>({ list: [], show: false }); // Todo only filters by university right now
  const [searchResults, setSearchResults] = useState<{
    loaded: boolean;
    list: Uni[];
  }>({ list: [], loaded: true });

  const fetchSearchResults = async () => {
    // const data = await get
  };

  return (
    <div className='bg-white '>
      <section>
        <div className='container mx-auto my-4 py-2 w-5/6  bg-white flex justify-between items-center border-b border-primary-900  '>
          <div className=' container  flex items-center text-primary-900 bg-white '>
            <Link href='/' passHref>
              <div>
                <FiArrowLeft />
              </div>
            </Link>
            <input
              type='text'
              autoFocus
              className='px-2 focus:outline-none'
              value={searchInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchInput(event.currentTarget.value)
              }
            />
          </div>
          <div className='px-4 text-primary-900 border-l border-primary-900 border-opacity-40'>
            <button onClick={() => setFilter({ ...filter, show: !filter.show })}>
              <FiFilter />
            </button>
          </div>
        </div>
      </section>
      <section className='w-5/6 mx-auto' style={{ display: filter.show ? 'block' : 'none' }}>
        {/* //Todo add transition/animation to dropping down
         */}
        <span className='text-sm text-gray-700'>Filter by:</span>

        <UniFilter list={universities} state={filter} action={setFilter} />
      </section>
      <section className='w-5/6 mx-auto text-center'>
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
    </div>
  );
};

export default MobileSearch;
