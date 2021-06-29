import Link from 'next/link';
import React from 'react';
import Card from './atom/Card';
import Ripple from './atom/Ripple';
import StarRating from './atom/StarRating';
import UniTag from './UniTag';

interface CourseSummary {
  name: string;
  uni: string;
  rating: number;
  ratingCount: number;
  link: string;
  stage: number;
}

export interface CourseCardProps {
  course: CourseSummary;
}

const CourseCard: React.FC<CourseCardProps> = ({ course: {name, rating, ratingCount, uni, link} }) => (
  <Ripple
    grow
    rippleClassName='bg-primary-400'
    rippleContainerClassName='rounded-xl'
    className='my-4'
  >
    <Link href={link} passHref>
      <Card as='article'>
        <Card.Body className={'relative z-10'}>
          <Card.Title>
            <div className={'flex items-center justify-between w-full'}>
            <div>{name}</div>
            <UniTag uni='UoA'/>
            </div>
          </Card.Title>

          <div className={'flex flex-wrap'}>
            <StarRating rating={rating} />
            <div className={'ml-2 font-semibold'}>
              {rating} ({ratingCount} reviews)
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Ripple>
);

export default CourseCard;
