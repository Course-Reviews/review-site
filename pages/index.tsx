import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { FiInstagram } from 'react-icons/fi';
import Button from '../components/atom/Button';
import Card from '../components/atom/Card';
import CourseSearch from '../components/search/CourseSearch';
import Logo from '../components/general/Logo';
import Parallax from '../components/general/Parallax';
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
    <main className='-mt-4 flex flex-grow flex-col items-center justify-start self-stretch'>
      <Parallax
        className={
          'h-hero-mobile md:h-hero bg-hero bg-center bg-no-repeat bg-cover self-stretch flex flex-col justify-end items-center px-8 pb-4'
        }
      >
        <Logo className={'h-24 md:h-32 mb-8 md:mb-12'} fill='white' />
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
      <Card as='section' className={'md:w-1/2 mx-4 mt-20 mb-10'}>
        <Card.Body>
          <h2 className='font-bold text-2xl my-4 text-center'>CourseReview</h2>
          <p className='text-lg text-center'>
            Do you have something to say about your university courses? Or are you trying to
            prepare/decide what to do next? CourseReviews is a platform for you to search, read and
            post reviews for university courses in NZ.
          </p>
        </Card.Body>
      </Card>
      <Card as='section' className={'md:w-1/2 mx-4 mb-10'}>
        <Card.Body>
          <h2 className='font-bold text-2xl my-4 text-center'>Stay up to date</h2>
          <p className='text-lg text-center'>
            Follow us on social media for updates on new features and course review news
          </p>
          <a href={'https://www.instagram.com/coursereview.nz/'} target='social'>
            <Button className={'mx-auto my-2'}>
              <FiInstagram size={24} className={'-m-2 mr-2'} /> Check us out on Instagram
            </Button>
          </a>
        </Card.Body>
      </Card>
      <span className={'text-sm mx-2 text-center'}>
        By using our platform you agree to our{' '}
        <Link href='/terms-and-conditions'>
          <a className={'text-primary-500'}>
            <strong>Terms and & Conditions</strong>
          </a>
        </Link>
      </span>
    </main>
  </Fragment>
);

export default Landing;
