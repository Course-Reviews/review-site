import React, { HTMLAttributes, useEffect, useState } from 'react';
import classnames from 'classnames';
import { FiStar } from 'react-icons/fi';

interface RatingInputProps {
  className: string;
  size?: number;
  onChange?: (val: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ size = 28, onChange, className, ...rest }) => {

  const [r, setR] = useState(0);
  const [hoverNum, setHoverNum] = useState(0);

  useEffect(() => {
    if (onChange){
      onChange(r);
    }
  }, [r])

  return(
  <div className={classnames('flex', className)} {...rest} onMouseLeave={() => setHoverNum(0)}>
    {[1, 2, 3, 4, 5].map((e, i) => (
      <FiStar
        size={size}
        className={classnames('cursor-pointer mx-0.5', r >= e ? 'text-primary-500' : hoverNum >= e ? 'text-primary-200' : 'text-gray-600')}
        key={i}
        fill={(r >= e || hoverNum >= e)? 'currentColor' : 'none'}
        onClick={() => setR(e)}
        onMouseOver={() => setHoverNum(e)}
      />
    ))}
  </div>
)
};

export default RatingInput;
