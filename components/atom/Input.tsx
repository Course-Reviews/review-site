import React, { ElementType } from 'react';

import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import Ripple from './Ripple';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType;
  invalid?: boolean;
}

const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<unknown>> = React.forwardRef(({ className, as: Component = 'input', invalid, disabled, ...rest }, ref) => (
  <Ripple
    grow
    rippleClassName='bg-primary-200'
    rippleContainerClassName='rounded-xl'
    className='bg-white'
  >
    <Component
      disabled={disabled}
      ref={ref}
      className={classnames(
        disabled ? 'bg-gray-200 text-gray-400' :
        invalid ? '' : '',
        'bg-transparent border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring focus:ring-primary-300 relative z-10',
        className
      )}
      {...rest}
    />
  </Ripple>
));

Input.displayName = 'Input';

export default Input;
