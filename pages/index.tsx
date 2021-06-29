import React from 'react';
import CourseSearch from '../components/CourseSearch';
export interface LandingProps {}

const Landing: React.FC<LandingProps> = () => (
    <main className='container mx-auto my-auto md:h-5/6 md:flex md:flex-col md:w-full md:justify-center md:items-center'>
     <CourseSearch/>
    </main>
  );

export default Landing;
