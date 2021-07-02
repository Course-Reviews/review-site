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

interface ReviewProps {
  name?: string;
  rating: number;
  contentRating: number;
  workloadRating: number;
  deliveryRating: number;
  content: string;
  dateTaken: string;
  highlight?: boolean;
}

const Review: React.FC<ReviewProps> = ({ name, highlight, rating, content, dateTaken }) => (
  <MixpanelConsumer>
    {(mixpanel: any) => (
      <Card
        className={ classNames('my-2', highlight && 'ring-4 ring-primary-500')}
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
            <Badge >{dateTaken}</Badge>

          </div>
          <div className={'flex text-center mt-3 mb-1 divide-x'}>
            <div className={'w-1/3'}>
              <div className={'font-bold text-primary-500'}>
                <span className={'text-2xl'}>3</span>
                <span className={'text-sm'}>/5</span>
              </div>
              <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Content</div>
            </div>
            <div className={'w-1/3'}>
              <div className={'font-bold text-primary-500'}>
                <span className={'text-2xl'}>4</span>
                <span className={'text-sm'}>/5</span>
              </div>
              <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Workload</div>
            </div>
            <div className={'w-1/3'}>
              <div className={'font-bold text-primary-500'}>
                <span className={'text-2xl'}>2</span>
                <span className={'text-sm'}>/5</span>
              </div>
              <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Delivery</div>
            </div>
          </div>
          <section className={'flex flex-col'}>
            <p itemProp='reviewBody' className={'mt-2'}>
              {content}
            </p>
          </section>
          <section className={'flex justify-between mb-2'}>
            <div itemProp='author' className={' text-gray-400 italic font-semibold'}>
              - {name ? name : 'Anonymous'}
            </div>
            <div> </div>
          </section>
          <div className={'flex'}>
          <IconButton
              variant='none'
              onClick={() => {
                mixpanel.track('[REVIEW] report', { value: content });
              }}
            >
              <FiFlag size={24} className={'text-gray-700'} />
            </IconButton>
            <div className={'flex-grow'}/>
            <IconButton
              variant='none'
              icon={FiThumbsDown}
            />
            <div className={'mx-4 font-bold text-gray-700'}>2</div> <IconButton
              variant='none'
              icon={FiThumbsUp}
            />
          </div>
        </Card.Body>
      </Card>
    )}
  </MixpanelConsumer>
);

export default Review;
