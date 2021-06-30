import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Button from '../components/atom/Button';
import CourseSearch from '../components/CourseSearch';
import Image from 'next/image';
import bg from '../assets/bg_3.svg';
import Parallax from '../components/Parallax';

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
    <main
      className='-mt-4 flex flex-grow flex-col items-center justify-start self-stretch'
    >
      <Parallax className={'h-hero bg-hero bg-center bg-no-repeat bg-cover self-stretch flex flex-col justify-end items-center px-8 pb-4'}>
      <h1 className={'mb-14 text-white font-bold text-4xl text-center'}>Search Reviews for 1000+ Uni Courses</h1>
      </Parallax>
      <div className={'flex flex-col relative -top-8 items-center -mb-8'}>
        <CourseSearch />
      </div>
      <div className={'my-2 font-semibold text-gray-500'}>or</div>
      <Link href='/courses'>
        <a className='text-center pt-4 font-bold'>
          <Button>Browse all courses</Button>
        </a>
      </Link>
    </main>
  </Fragment>
);

export default Landing;
