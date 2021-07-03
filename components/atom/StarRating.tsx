import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { FiStar } from 'react-icons/fi';

interface StarRatingProps extends HTMLAttributes<HTMLElement> {
  rating: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 24, className, ...rest }) => (
  <div className={classnames('flex', className)} {...rest}>
    {[0, 1, 2, 3, 4].map((e, i) => {
      if (rating > e && rating < e + 1) {
        console.log(rating % 1);
        return (
          <div className={'relative mx-0.5'}>
            <FiStar size={size} />
            <div className={'absolute top-0 overflow-x-hidden'} style={{width: `${(0.6 *(rating % 1) + 0.2) * 100}%`}}>
            <FiStar size={size} fill={'currentColor'}/>
            </div>

          </div>
        );
      }

      return (
        <FiStar
          size={size}
          className={'mx-0.5'}
          key={i}
          fill={rating >= e + 1 ? 'currentColor' : 'none'}
        />
      );
    })}
  </div>
);

export default StarRating;
