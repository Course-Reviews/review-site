import { GetServerSideProps } from 'next';
import React from 'react';
import Card from '../../components/atom/Card';
import StarRating from '../../components/atom/StarRating';
import Logo from '../../components/Logo';
import connectDB from '../../db/mongoose';
import Course from '../../models/course';
import Review from '../../models/review';
import { ReviewData, UNI_NAMES_SHORT } from '../../types/config';

interface props {
  content: string;
  rating: number;
  code: string;
  uni: string;
}

const ReviewInstagramStory: React.FC<props> = ({ code, uni, content, rating }) => (
  <div
    id={'story'}
    className={'bg-insta-story mx-auto flex flex-col items-center z-50 fixed inset-0 bg-cover'}
  >
    <Logo fill={'white'} className={'mx-auto my-24 h-64'} />
    <p className={'text-5xl font-semibold text-white text-opacity-80'}>Reviews for</p>
    <p className={'text-7xl font-bold text-white my-8'}>{code}</p>
    <p className={'text-5xl font-semibold text-white text-opacity-80'}>at <span className={'text-white font-bold'}>{UNI_NAMES_SHORT[uni]}</span></p>
    <Card
      className={'text-4xl mt-24 px-16 py-12 text-gray-700 w-9/12 flex flex-col text-center items-center'}
    >
      <span className={'text-5xl font-bold mb-8 text-gray-500'}>
        {Math.round(rating * 10) / 10}/5
      </span>
      <StarRating rating={rating} size={64} className={'mb-8 text-secondary-500'} />
      <span>
        {content.substring(0, 250).trim()}
        {content.length > 250 && '...'}
      </span>
    </Card>
    <div className={'flex w-9/12 pl-16'}>
      <svg
        width='168'
        height='84'
        viewBox='0 0 168 84'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M47 0C41 38.8 28.3333 66.3333 0 84C73.2 78.8 142.333 31.6667 168 0H47Z'
          fill='white'
        />
      </svg>
    </div>
    <div className={'flex-grow'}/>
    <p className={'text-5xl font-semibold text-white text-opacity-80 mx-24 text-center'}>Read more reviews for</p>
      <p className={'text-5xl font-bold text-white mx-24 text-center my-4'}>{code}</p>
      <p  className={'text-5xl font-semibold text-white text-opacity-80 mx-24 text-center'}> and over 3000 other courses at</p>
    <p className={'text-7xl font-bold text-white my-16'}>coursereview.co.nz</p>
  </div>
);

export default ReviewInstagramStory;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { postId } = params as { [k: string]: string };

  let review;

  connectDB();

  if(postId === 'random'){
    const query = await Review.aggregate([{ $match: {'content': {$ne: null}}}, {$sample: {size: 1}}]);
    review = query[0]
  } else {
    review = await Review.findOne({ _id: postId });
  }

  const course = await Course.findOne({ _id: review.owner });

  return {
    props: {
      code: course.code,
      content: review.content,
      rating: review.course_rating,
      uni: course.university,
    },
  };
};
