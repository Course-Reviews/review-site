import Head from 'next/head';
import { Fragment } from 'react';

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
    <div className='container w-1/4 mx-auto flex flex-col'>
      <h1 className='font-bold text-4xl my-4'>Terms and Conditions</h1>
      <p className='text-lg'>
        <strong>CourseReview</strong> provides a platform for anonymous reviews of the courses. We
        do not tolerate hate speech, harassment or any other written abuse. <br />
        <br />
        Please view the content at your discretion. If you encounter an offensive review, we urge
        you to report it for the content moderation team to investigate.
        <br />
        <br />
        We are a private entity and are not a part of any university organization that we provide
        platform for course reviews.
        <br />
        <br />
        If you have any issues please engage with our support team at coursereview.nz@gmail.com
      </p>
    </div>
  </Fragment>
);

export default TermsAndConditions;
