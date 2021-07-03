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
   * Classnames to apply to the inner button element
   */
  innerClassName?: string;
  /**
   *
   */
  icon?: IconType;
}

const IconButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  innerClassName,
  disabled,
  onClick,
  icon: Icon,
  ...rest
}) => (
  <Ripple disabled={disabled} rippleContainerClassName='rounded-full' rippleClassName={'bg-primary-500'}>
    <button
      className={classNames(
        'rounded-full font-bold transition transform duration-200 ease-in-out focus:outline-none items-center ',
        !disabled && variant !== 'none' && 'shadow',
        variant !== 'none' ? 'text-white p-3' : disabled ? 'text-gray-300' : 'text-gray-800 hover:text-primary-500',
        [
          `ring-${variant}-200`,
          disabled ? `bg-${variant}-400` : `bg-${variant}-500`,
        ],
        innerClassName
      )}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
       {...rest}
    >
      {Icon ? <Icon size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className={'relative z-10'}/> : children}
    </button>
  </Ripple>
);

export default IconButton;
