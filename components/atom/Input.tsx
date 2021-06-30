import React, { ElementType } from 'react';

import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import Ripple from './Ripple';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType;
  invalid?: boolean;
}

const Input: React.FC<InputProps> = ({ className, as: Component = 'input', invalid, disabled, ...rest }) => (
  <Ripple
    grow
    rippleClassName='bg-primary-200'
    rippleContainerClassName='rounded-xl'
    className='bg-white'
  >
    <Component
      disabled={disabled}
      className={classnames(
        disabled ? 'bg-gray-200 text-gray-400' :
        invalid ? '' : '',
        'bg-transparent border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring focus:ring-primary-300 relative z-10',
        className
      )}
      {...rest}
    />
  </Ripple>
);

export default Input;
