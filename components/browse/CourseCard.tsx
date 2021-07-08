import Link from 'next/link';
import React from 'react';
import { CourseSummary } from '../../types/config';
import { codeToURL } from '../../util/util';
import Card from '../atom/Card';
import Ripple from '../atom/Ripple';
import StarRating from '../atom/StarRating';
import UniTag from '../search/UniTag';

export interface CourseCardProps {
  course: CourseSummary;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course: { title, code, rating, numRatings, university, pageId },
}) => {
  const url = `/courses/${university}/${codeToURL(code)}`;

  return (
    <Ripple
      grow
      rippleClassName='bg-primary-400'
      rippleContainerClassName='rounded-xl'
      className='my-4'
    >
      <Link href={url} passHref>
        <Card as='article'>
          <Card.Body className={'relative z-10'}>
            <div className={'flex font-bold  items-center justify-between w-full'}>
              <div className={'text-gray-400'}>{code}</div>
              <UniTag uni='UoA' />
            </div>
            <div className={'font-semibold text-lg -mt-1 mb-2'}>{title}</div>
            <div className={'flex flex-wrap'}>
              <StarRating rating={rating} className={numRatings > 0 ? 'text-secondary-500' : 'text-gray-500'} />
              {numRatings > 0 ? <div className={'ml-2 font-semibold'}>
                {Math.round(rating * 10) / 10}/5 ({numRatings} review{numRatings === 1 ? '' : 's'})
              </div> : <div className={'ml-2 font-semibold'}>No ratings</div> }
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Ripple>
  );
};

export default CourseCard;
