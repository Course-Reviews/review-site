import React from 'react';
import { FiArrowDown, FiArrowUp, FiFlag, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import Card from './atom/Card';
import IconButton from './atom/IconButton';
import StarRating from './atom/StarRating';
import { MixpanelConsumer } from 'react-mixpanel';
import Col from './atom/Col';
import Row from './atom/Row';
import classNames from 'classnames';
import Badge from './atom/Badge';
import { ReviewData } from '../types/config';
import { patchData } from '../functions';

interface ReviewProps {
  review: ReviewData;
  highlight?: boolean;
}

const Review: React.FC<ReviewProps> = ({
  highlight,
  review: { id, rating, timeTaken, content, votes, contentRating, workloadRating, deliveryRating },
}) => (
  <MixpanelConsumer>
    {(mixpanel: any) => (
      <Card
        className={classNames('mb-4', highlight && 'ring-4 ring-primary-500')}
        as='article'
        itemProp='review'
        itemScope={true}
        itemType='https://schema.org/Review'
      >
        <Card.Body>
          <div className={'flex items-center text-sm font-bold text-gray-500'}>
            <StarRating rating={rating} size={20} className={'text-secondary-500 mr-2'} />
            <div
              itemProp='reviewRating'
              itemScope
              itemType='https://schema.org/Rating'
              className={'text-gray-500'}
            >
              <meta itemProp='worstRating' content='1' />
              <span itemProp='ratingValue'>{Math.round(rating * 10) / 10}</span>/
              <span itemProp='bestRating'>5</span>
            </div>
            <div className={'flex-grow'} />
            <div className={'text-gray-500'}>{timeTaken}</div>
          </div>
          <div className={'flex text-center mt-3 mb-1 divide-x'}>
            <div className={'w-1/3'}>
              <div className={'font-bold text-primary-500'}>
                <span className={'text-2xl'}>{contentRating}</span>
                <span className={'text-sm text-primary-300'}>/5</span>
              </div>
              <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Content</div>
            </div>
            <div className={'w-1/3'}>
              <div className={'font-bold text-primary-500'}>
                <span className={'text-2xl'}>{workloadRating}</span>
                <span className={'text-sm text-primary-300'}>/5</span>
              </div>
              <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Workload</div>
            </div>
            <div className={'w-1/3'}>
              <div className={'font-bold text-primary-500'}>
                <span className={'text-2xl'}>{deliveryRating}</span>
                <span className={'text-sm text-primary-300'}>/5</span>
              </div>
              <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Delivery</div>
            </div>
          </div>
          <section className={'flex flex-col'}>
            <p itemProp='reviewBody' className={'mt-2 whitespace-pre-line'}>
              {content}
            </p>
          </section>
          <section className={'flex justify-between mb-2'}>
            <div itemProp='author' className={' text-gray-400 italic font-semibold'}>
              - Anonymous
            </div>
            <div> </div>
          </section>
          <div className={'flex border-t pt-2'}>
            <IconButton
              variant='none'
              onClick={() => {
                mixpanel.track('[REVIEW] report', { value: content });
              }}
            >
              <FiFlag size={24} className={'text-gray-700'} />
            </IconButton>
            <div className={'flex-grow'} />
            <IconButton
              variant='none'
              icon={FiThumbsDown}
              onClick={() => patchData(`api/post/${id}/upvote`)}
            />
            <div className={'mx-4 font-bold text-gray-700'}>{votes}</div>{' '}
            <IconButton
              variant='none'
              icon={FiThumbsUp}
              onClick={() => patchData(`api/post/${id}/downvote`)}
            />
          </div>
        </Card.Body>
      </Card>
    )}
  </MixpanelConsumer>
);

export default Review;
