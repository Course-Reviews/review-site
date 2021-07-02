import Head from 'next/head';
import React, { Fragment } from 'react';
import Card from '../../components/atom/Card';
import Container from '../../components/atom/Container';
import Logo from '../../components/Logo';

const TermsAndConditions: React.FC = () => (
  <Fragment>
    <Head>
      <meta />
      <title>Terms and Conditions of CourseReview</title>
      <meta
        name='description'
        content='CourseReview provides a platform for anonymous reviews of the courses. Terms and Conditions apply.'
      />
    </Head>
    <Container as='main' className={'text-gray-700 max-w-xl'}>
      <Logo className={'mx-auto h-16'} />
      <h1 className='font-bold text-3xl my-4 text-gray-800 text-center'>Terms and Conditions</h1>
      <Card>
        <Card.Body>
          <p>
            <strong>CourseReview</strong> provides a platform for anonymous reviews of the courses.
            We do not tolerate hate speech, harassment or any other written abuse. <br />
            <br />
            Please view the content at your discretion. If you encounter an offensive review, we
            urge you to report it for the content moderation team to investigate.
            <br />
            <br />
            We are a private entity and are not a part of any university organization that we
            provide platform for course reviews.
            <br />
            <br />
            If you have any issues please engage with our support team at{' '}
            <a href='mailto:coursereview.nz@gmail.com' className={'text-primary-500'}>
              coursereview.nz@gmail.com
            </a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  </Fragment>
);

export default TermsAndConditions;
