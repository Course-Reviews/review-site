import { useModal } from 'async-modals';
import Link from 'next/link';
import React from 'react';
import AdBanner from '../ad-banners/AdBanner';
import FeedbackModal from '../FeedbackModal';

const Footer: React.FC = () => {
  const modal = useModal(FeedbackModal);

  return (
    <>
      <footer className='flex flex-col md:flex-row w-full text-center px-4 py-4 text-gray-600 absolute bottom-0 justify-between'>
        <p>Copyright © 2021 CourseReview</p>
        <button
          onClick={() => modal.show()}
          className='font-semibold text-primary-600 my-2 md:my-0'
        >
          Leave Feedback
        </button>
        <Link href='/terms-and-conditions'>
          <a className={'underline'}>Terms and Conditions</a>
        </Link>
      </footer>
      <AdBanner />
    </>
  );
};

export default Footer;
