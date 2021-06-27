import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { Color, Size } from '../../types/tailwind';
import Ripple from './Ripple';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Color | 'none';
  /**
   * Set the size of the button to either 'sm', 'md' (default), 'lg
   */
  size?: Size;
  /**
   * Allow the button to grow to fit the width of its container
   */
  grow?: boolean;
  /**
   * Classnames to apply to the inner button element
   */
  innerClassName?: string;
  /**
   *
   */
  icon: IconType;
}

const IconButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  innerClassName,
  grow,
  disabled,
  icon: Icon,
  ...rest
}) => (
  <Ripple grow={grow} disabled={disabled} rippleContainerClassName='rounded-full' rippleClassName={'bg-primary-500'}>
    <button
      className={classNames(
        'rounded-full font-bold transition transform duration-200 ease-in-out focus:outline-none flex items-center p-3',
        !disabled && variant !== 'none' && 'shadow',
        variant !== 'none' ? 'text-white ' : 'text-gray-800 hover:text-primary-500',
        [
          `ring-${variant}-200`,
          disabled ? `bg-${variant}-400` : `bg-${variant}-500`,
        ],
        innerClassName
      )}
      disabled={disabled}
       {...rest}
    >
      <Icon size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className={'relative z-10'}/>
    </button>
  </Ripple>
);

export default IconButton;
