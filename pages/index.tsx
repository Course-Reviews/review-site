import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Button from '../components/atom/Button';
import CourseSearch from '../components/CourseSearch';

export interface LandingProps {}

const Landing: React.FC<LandingProps> = () => (
  // Todo Add more word content to the landing page AND add the logo icon for favicon
  <Fragment>
    <Head>
      <title>Search or Post University Course Reviews - Discors</title>
      <meta
        name='description'
        content='Search or post a review for your university courses to reflect or prepare in NZ including UoA, AUT, Otago, Massey, and Vic '
      />
      <meta
        name='keywords'
        content='Course reviews, post course reviews, student course reviews, course reviews NZ, uoa course reviews'
      />
      <meta name='robots' content='index,follow' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <main className='mt-10 mx-auto h-80vh md:h-90vh my-auto flex flex-col md:w-full md:justify-center items-center bg-hero bg-bottom bg-no-repeat md:bg-cover bg-contain '>
      <CourseSearch />
      <div className={'my-2 font-semibold text-gray-500'}>or</div>
      <Link href='/courses'>
          <a className='text-center pt-4 font-bold'><Button variant='gray'>Browse all courses</Button></a>
        </Link>
    </main>
  </Fragment>
);

export default Landing;
