import { useModal } from 'async-modals';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit3, FiFlag, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { MixpanelConsumer } from 'react-mixpanel';
import { patchData } from '../functions';
import { ReviewData } from '../types/config';
import Badge from './atom/Badge';
import Card from './atom/Card';
import IconButton from './atom/IconButton';
import StarRating from './atom/StarRating';
import { AuthContext } from './general/CognitoAuthProvider';
import SignupBenefitsModal from './SignupBenefitsModal';

interface ReviewProps {
  review: ReviewData;
  isOwner?: boolean;
  onEdit?: () => void;
}

const Review: React.FC<ReviewProps> = ({
  review: {
    id,
    rating,
    timeTaken,
    content,
    votes: v,
    deliveryRating,
    relaxedRating,
    enjoymentRating,
    username,
  },
  isOwner,
  onEdit
}) => {
  const [votes, setVotes] = useState(v);
  const {user, ratings} = useContext(AuthContext);
  const [vote, setVote] = useState<boolean>();
  const modal = useModal(SignupBenefitsModal);

  useEffect(() => {
    setVote(ratings[id])
  }, [ratings, id])

  const castVote = async (type: boolean) => {
    if(!user){
      modal.show()
    } else {
      if (isOwner) return;
      if (vote === type) return;
      setVote(type);
      const {data} = await patchData(`api/posts/${id}/${type ? 'upvote' : 'downvote'}`);
      if(data || data === 0){
        setVotes(data);
      }
    }
  }



  return (
    <MixpanelConsumer>
      {(mixpanel: any) => (
        <Card className={classNames('mb-4', isOwner && 'ring-4 ring-primary-500')} as='article'>
          <Card.Body>
            <div className={'flex items-start text-sm font-bold text-gray-500 relative'}>
            {isOwner && <Badge className={'absolute -top-7 left-0'}>Your review</Badge>}

              <StarRating rating={rating} size={20} className={'text-secondary-500 mr-2'} />
              <div className={'text-gray-500'}>
                <meta content='1' />
                <span>{Math.round(rating * 10) / 10}</span>/<span>5</span>
              </div>
              <div className={'flex-grow'} />
              <div className={'text-gray-500'}>{timeTaken}</div>
            </div>
            <div className={'flex text-center mt-3 mb-1 divide-x'}>
              <div className={'w-1/3'}>
                <div className={'font-bold text-primary-500'}>
                  <span className={'text-2xl'}>{relaxedRating}</span>
                  <span className={'text-sm text-primary-300'}>/5</span>
                </div>
                <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Relaxed</div>
              </div>
              <div className={'w-1/3'}>
                <div className={'font-bold text-primary-500'}>
                  <span className={'text-2xl'}>{enjoymentRating}</span>
                  <span className={'text-sm text-primary-300'}>/5</span>
                </div>
                <div className={'mt-0.5 text-xs font-semibold text-gray-500'}>Enjoyment</div>
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
              <p className={'mt-2 whitespace-pre-line'}>{content}</p>
            </section>
            <section className={'flex justify-between mb-2'}>
              <div itemProp='author' className={' text-gray-500 italic'}>
                - {username || 'Anonymous'}
              </div>
              <div> </div>
            </section>
            <div className={'flex border-t pt-2'}>

              {isOwner ?  <button
                onClick={onEdit}
                className={'text-primary-500 flex font-semibold'}
              >
                <FiEdit3 size={24} className={'mr-2'}/>
                Edit Review
              </button> : <IconButton
                variant='none'
                onClick={() => {
                  mixpanel.track('[REVIEW] report', { value: content });
                }}
                aria-label='Report post'
              >
                <FiFlag size={24} className={'text-gray-700'} />
              </IconButton>}
              <div className={'flex-grow'} />
              <IconButton
                variant='none'
                disabled={isOwner}
                onClick={() => castVote(false)}
              >
                <FiThumbsDown className={vote === false ? 'text-primary-500' : ''} fill={vote === false ? 'currentColor' : 'none'} size={24}/>
              </IconButton>
              <div className={'mx-4 font-bold text-gray-700'}>{votes}</div>{' '}
              <IconButton
                variant='none'
                disabled={isOwner}
                onClick={() => castVote(true)}
              >
                <FiThumbsUp className={vote === true ? 'text-primary-500' : ''} fill={vote === true ? 'currentColor' : 'none'} size={24}/>
              </IconButton>
            </div>
          </Card.Body>
        </Card>
      )}
    </MixpanelConsumer>
  );
};

export default Review;
