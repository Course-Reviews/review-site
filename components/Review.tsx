import React from 'react';
import Card from './atom/Card';
import StarRating from './atom/StarRating';

interface ReviewProps {
  name?: string;
  rating: number;
  content: string;
  dateTaken: string;
}

const Review: React.FC<ReviewProps> = ({ name, rating, content }) => (
  <Card>
    <Card.Body>
      <div className={'flex items-center text-sm font-bold '}>
      <StarRating rating={rating} size={20} className={'text-secondary-500 mr-2'}/>
      <div>{rating}/5</div>
      </div>
      <div className={'flex flex-col'}>
        {' '}
        <div className={'mt-2'}>{content}</div>
        <div className={'italic font-semibold text-gray-500'}>- {name ? name : 'Anonymous'}</div>
      </div>
    </Card.Body>
  </Card>
);

export default Review;
