import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { FiInstagram } from 'react-icons/fi';
import Accordian from '../components/atom/Accordian';
import Button from '../components/atom/Button';
import Card from '../components/atom/Card';
import CourseSearch from '../components/CourseSearch';
import Logo from '../components/Logo';
import Parallax from '../components/Parallax';
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
      <script async src='https://www.googletagmanager.com/gtag/js?id=G-PEWLQXVEKL'></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if(typeof window !== 'undefined'){
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PEWLQXVEKL', { page_path: window.location.pathname });
          }
            `,
        }}
      />
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
          <p className='text-lg '>
            Do you have something to say about your university courses? Or are you trying to
            prepare/decide what to do next? CourseReviews is a platform for you to search, read and
            post reviews for university courses in NZ.
          </p>
          <br />
          <br />
          <p className='text-lg '>
            We are part 3 software engineering students (Alex, Michael, and JiaQi) who were annoyed
            at the lack of course reviews (especially when we were selecting our electives). We
            decided to make a fresh platform to make it easier for students to share their
            experiences and help future generations of students to prepare for their courses. We are
            planning to continue working on the site and adding more features so please let us know
            how we can improve!
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
      <Card as='section' className={'md:w-1/2 mx-4 mb-10'}>
        <Card.Body>
          <h2 className='font-bold text-2xl my-4 text-center'>F.A.Q</h2>
          <Accordian>
            <Accordian.Item expanded>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>Can I change my review? </h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>Yes but you will need an account at Course Review</p>
              </Accordian.Body>
            </Accordian.Item>
            <Accordian.Item>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>Are reviews anonymous</h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>
                  {' '}
                  Yes, and you have an option to use your name with an account{' '}
                </p>
              </Accordian.Body>
            </Accordian.Item>
            <Accordian.Item>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>Do you censor reviews? </h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>
                  No, however, we moderate unhelpful or highly offensive reviews flagged by our
                  users. Please report anything that you might find inappropriate.
                </p>
              </Accordian.Body>
            </Accordian.Item>
            <Accordian.Item>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>
                  Are you affiliated with universities?{' '}
                </h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>
                  Are <b>you</b> affiliated with universities? (no)
                </p>
              </Accordian.Body>
            </Accordian.Item>
            <Accordian.Item>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>
                  Do you have all of NZ universities?
                </h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>
                  Currently we support UoA, and will soon add AUT, OTAGO, MASSEY, CANTERBURY and
                  more{' '}
                </p>
              </Accordian.Body>
            </Accordian.Item>
            <Accordian.Item>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>
                  Did the chicken come before the egg?{' '}
                </h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>
                  The chicken did <b>not</b> come before the egg.
                </p>
              </Accordian.Body>
            </Accordian.Item>
            <Accordian.Item>
              <Accordian.Header>
                <h3 className={'text-lg font-semibold text-gray-700'}>How can I reach you?</h3>
              </Accordian.Header>
              <Accordian.Body>
                <p className={'text-gray-700'}>
                  <a href=''>coursereview.nz@gmail.com</a>
                </p>
              </Accordian.Body>
            </Accordian.Item>
          </Accordian>
        </Card.Body>
      </Card>
      <Card as='section' className={'md:w-1/2 mx-4 mb-10'}>
        <Card.Body>
          <h2 className='font-bold text-2xl my-4'>Writing helpful reviews</h2>
          <p className='text-lg '>
            You can write the review in any way you`d like however we suggest you structure it as
            advice to the next generation of students. You can first describe your course experience
            (was it hard, was the lecturer annoying or nice) and how the reader who is about to take
            this course can prepare to make their life easier. If the course had an alternative that
            you consider, let the reader know and perhaps you can save them a wrong decision. Be
            respectful of the lecturers and the staff as they are just doing their job and trying to
            educate the future generation. Or write a funny review, we welcome that also.
          </p>
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
