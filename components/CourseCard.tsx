import Link from 'next/link';
import React from 'react';
import Card from './Card';
import Ripple from './Ripple';
import StarRating from './StarRating';

interface CourseCardProps {
  name: string;
  uni: string;
  rating: number;
  ratingCount: number;
}

const CourseCard: React.FC<CourseCardProps> = ({name, uni, rating, ratingCount}) => (
  <Ripple grow rippleClassName='bg-primary-400' rippleContainerClassName='rounded-xl'>
    <Link href={`/courses/${name}`} passHref>
    <Card as='article'>
      <Card.Body className={'relative z-10'}>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{uni}</Card.Text>
        <div className={'flex flex-wrap'}>
          <StarRating rating={rating}/>
          <div className={'ml-2 font-semibold'}>{rating} ({ratingCount} reviews)</div>
        </div>
      </Card.Body>
    </Card>
    </Link>
    </Ripple>
  )

export default CourseCard;