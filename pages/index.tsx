import React from 'react';
import CourseSearch from '../components/CourseSearch';
import { Uni } from '../components/SearchResult';
export interface LandingProps {}

const Landing: React.FC<LandingProps> = () => (
  <main className='mt-10 mx-auto h-80vh md:h-90vh my-auto md:flex md:flex-col md:w-full md:justify-center md:items-center bg-hero bg-bottom bg-no-repeat md:bg-cover bg-contain '>
    <CourseSearch />
  </main>
);

export default Landing;
