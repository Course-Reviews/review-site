import Head from 'next/head';
import React, { ChangeEvent, useState } from 'react';
import { FiSearch, FiFilter, FiInfo } from 'react-icons/fi';
import UniTag from '../components/UniTag';
import { useRouter } from 'next/router';
import UniFilter from '../components/UniFilter';
import SearchResult from '../components/SearchResult';
import Expand from '../components/atom/Expand';
import classNames from 'classnames';
import Ripple from '../components/atom/Ripple';
import CourseSearch from '../components/CourseSearch';
export interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
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

  const results = [
    { id: '1', name: 'SOFTENG 351', uni: 'UoA' },
    { id: '2', name: 'SOFTENG 351', uni: 'Massey' },
    { id: '3', name: 'SOFTENG 351', uni: 'VIC' },
    { id: '4', name: 'SOFTENG 351', uni: 'AUT' },
  ];

  const universities: string[] = ['UoA', 'Massey', 'AUT', 'VIC', 'Otago'];

  return (
    <main className='container mx-auto my-auto md:h-5/6 md:flex md:flex-col md:w-full md:justify-center md:items-center'>
     <CourseSearch/>
    </main>
  );
};

export default Landing;
