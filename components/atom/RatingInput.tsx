import React, { HTMLAttributes, useEffect, useState } from 'react';
import classnames from 'classnames';
import { FiStar } from 'react-icons/fi';
import { Control, Controller } from 'react-hook-form';

interface RatingInputProps {
  className: string;
  size?: number;
  control: Control<any>;
  name: string;
}

const RatingInput: React.FC<RatingInputProps> = ({ size = 28, control, name, className, ...rest }) => {

  const [hoverNum, setHoverNum] = useState(0);


  return(
    <Controller
    control={control}
    name={name}
    render={({
      field: { onChange, value },
    }) => (
  <div className={classnames('flex', className)} {...rest} onMouseLeave={() => setHoverNum(0)}>
    {[1, 2, 3, 4, 5].map((e, i) => (
      <FiStar
        size={size}
        className={classnames('cursor-pointer mx-0.5', value >= e ? 'text-primary-500' : hoverNum >= e ? 'text-primary-200' : 'text-gray-600')}
        key={i}
        fill={(value >= e || hoverNum >= e)? 'currentColor' : 'none'}
        onClick={() => onChange(e)}
        onMouseOver={() => setHoverNum(e)}
      />
    ))}
  </div>)}
    />
)
};

export default RatingInput;
