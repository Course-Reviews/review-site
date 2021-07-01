import React from 'react';
import { FiArrowDown, FiArrowUp, FiFlag } from 'react-icons/fi';
import Card from './atom/Card';
import IconButton from './atom/IconButton';
import StarRating from './atom/StarRating';
import { MixpanelConsumer } from 'react-mixpanel';

interface ReviewProps {
  name?: string;
  rating: number;
  content: string;
  dateTaken: string;
}

const Review: React.FC<ReviewProps> = ({ name, rating, content, dateTaken }) => (
  <MixpanelConsumer>
    {(mixpanel: any) => (
      <Card
        className={'my-2'}
        as='article'
        itemProp='review'
        itemScope={true}
        itemType='https://schema.org/Review'
      >
        <Card.Body>
          <div className={'flex items-center text-sm font-bold '}>
            <StarRating rating={rating} size={20} className={'text-secondary-500 mr-2'} />
            <div itemProp='reviewRating' itemScope itemType='https://schema.org/Rating'>
              <meta itemProp='worstRating' content='1' />
              <span itemProp='ratingValue'>{rating}</span>/<span itemProp='bestRating'>5</span>
            </div>
            <div className={'flex-grow'} />
            <IconButton
              variant='none'
              onClick={() => {
                mixpanel.track('[REVIEW] report', { value: content });
              }}
            >
              <FiFlag size={24} className={'text-gray-300'} />
            </IconButton>
          </div>
          <section className={'flex flex-col'}>
            <p itemProp='reviewBody' className={'mt-2'}>
              {content}
            </p>
          </section>
          <section className={'flex justify-between mt-2'}>
            <div itemProp='author' className={' text-gray-500 italic font-semibold'}>
              - {name ? name : 'Anonymous'}
            </div>
            <div> {dateTaken}</div>
          </section>
        </Card.Body>
      </Card>
    )}
  </MixpanelConsumer>
);

export default Review;
