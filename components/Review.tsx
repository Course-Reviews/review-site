import React from 'react';
import { FiArrowDown, FiArrowUp, FiFlag } from 'react-icons/fi';
import Card from './atom/Card';
import IconButton from './atom/IconButton';
import StarRating from './atom/StarRating';

interface ReviewProps {
  name?: string;
  rating: number;
  content: string;
  dateTaken: string;
}

const Review: React.FC<ReviewProps> = ({ name, rating, content, dateTaken }) => (
  <Card>
    <Card.Body>
      <div className={'flex'}>
        <div className={'flex flex-col -ml-1 mr-4 items-center -my-1 mb-1'}>
          <IconButton variant='none' >
            <FiArrowUp size={24} strokeWidth={3} className={'text-gray-300'}/>
          </IconButton>
          <div className={'text-center my-0.5 font-bold text-primary-600'}>3</div>
          <IconButton variant='none' >
            <FiArrowDown size={24} strokeWidth={3} className={'text-gray-300'}/>
          </IconButton>
        </div>
        <div className={'flex flex-col flex-grow'}>
          <div className={'flex items-center text-sm font-bold '}>
          <StarRating rating={rating} size={20} className={'text-secondary-500 mr-2'}/>
          <div>{rating}/5</div>
          <div className={'flex-grow'}/>
          <IconButton variant='none' >
            <FiFlag size={24} className={'text-gray-300'}/>
          </IconButton>
          </div>
          <div className={'flex flex-col'}>
            {' '}
            <div className={'mt-2'}>{content}</div>
          </div>
          <div className={'flex justify-between mt-2'}>
          <div className={' text-gray-500 italic font-semibold'}>- {name ? name : 'Anonymous'}</div>
          <div> {dateTaken}</div>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default Review;
