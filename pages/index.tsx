import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Button from '../components/atom/Button';
import CourseSearch from '../components/CourseSearch';
import Image from 'next/image';
import bg from '../assets/bg_3.svg';
import Parallax from '../components/Parallax';
import Container from '../components/atom/Container';
import Card from '../components/atom/Card';
import Logo from '../components/Logo';

export interface LandingProps {}

const Landing: React.FC<LandingProps> = () => (
  // Todo Add more word content to the landing page AND add the logo icon for favicon
  <Fragment>
    <Head>
      <title>Search or Post University Course Reviews</title>
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
    {/* <Container as='main' className={'flex'}> */}
    <main className='-mt-4 flex flex-grow flex-col items-center justify-start self-stretch'>
      <Parallax
        className={
          'h-hero-mobile md:h-hero bg-hero bg-center bg-no-repeat bg-cover self-stretch flex flex-col justify-end items-center px-8 pb-4'
        }
      >
        <Logo className={'h-24 md:h-32 mb-8 md:mb-12'} fill='white'/>
        <h1 className={'mb-14 text-white font-bold text-4xl text-center'}>
          Search Reviews for 3000+ Uni Courses
        </h1>
      </Parallax>
      <section className={'flex flex-col relative -top-8 items-center -mb-8'}>
        <CourseSearch />
      </section>
      <div className={'my-2 font-semibold text-gray-500'}>or</div>
      <Link href='/courses'>
        <a className='text-center pt-4 font-bold'>
          <Button>Browse all courses</Button>
        </a>
      </Link>
      {/* <section className='w-full md:w-1/2 mt-20 shadow-lg bg-white p-8 mx-4 text-gray-800'> */}
      <Card as='section' className={'md:w-1/2 mx-4 mt-20 mb-10'}>
        <Card.Body>
          <h2 className='font-bold text-2xl my-4 text-center'>CourseReviews</h2>
          <p className='text-lg'>
            Do you have something to say about your university courses? Or are you trying to
            prepare/decide what to do next? CourseReviews is a platform for you to search, read and
            post reviews for university courses in NZ. <br/><br/>
            <span className={'text-sm'}>By using our platform you agree to our{' '}
            <Link href='/terms-and-conditions'>
              <a className={'text-primary-500'} >
                <strong>Terms and & Conditions</strong>
              </a>
            </Link>
            </span>
          </p>
        </Card.Body>
      </Card>
      {/* </section> */}
    </main>
  </Fragment>
);

export default Landing;
