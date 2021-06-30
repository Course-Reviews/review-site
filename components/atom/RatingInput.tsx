import React, { HTMLAttributes, useState } from 'react';
import classnames from 'classnames';
import { FiStar } from 'react-icons/fi';

interface RatingInputProps extends HTMLAttributes<HTMLElement> {
  size?: number;
}

const RatingInput: React.FC<RatingInputProps> = ({ size = 28, className, ...rest }) => {

  const [r, setR] = useState(0);
  const [hoverNum, setHoverNum] = useState(0);

  return(
  <div className={classnames('flex', className)} {...rest} onMouseLeave={() => setHoverNum(0)}>
    {[0, 1, 2, 3, 4].map((e, i) => (
      <FiStar
        size={size}
        className={classnames('cursor-pointer mx-0.5', r >= i ? 'text-primary-500' : hoverNum >= i ? 'text-primary-200' : 'text-gray-600')}
        key={i}
        fill={(r >= i || hoverNum >= i)? 'currentColor' : 'none'}
        onClick={() => setR(i)}
        onMouseOver={() => setHoverNum(i)}
      />
    ))}
  </div>
)
};

export default RatingInput;
