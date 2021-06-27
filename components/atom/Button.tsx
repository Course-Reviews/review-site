import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { Color, Size } from '../types/tailwind';
import Ripple from './Ripple';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Color;
  /**
   * Set the size of the button to either 'sm', 'md' (default), 'lg
   */
  size?: Size;
  /**
   * Render the button as an outline rather than filled
   */
  outline?: boolean;
  /**
   * Allow the button to grow to fit the width of its container
   */
  grow?: boolean;
  /**
   * Classnames to apply to the inner button element
   */
  innerClassName?: string;
  /**
   * Apply this if including an icon in the button so that the padding can be adjusted
   */
  hasIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  innerClassName,
  outline,
  grow,
  disabled,
  hasIcon,
  ...rest
}) => (
  <Ripple grow={grow} className={classNames(outline && '-m-0.5', className)} disabled={disabled}>
    <button
      className={classNames(
        'rounded-full font-bold focus:ring transition transform duration-300 ease-in-out focus:outline-none flex items-center',
        !disabled && 'shadow',
        {
          'text-xs px-4 py-2': size === 'sm',
          'text-sm px-5 py-3': size === 'md',
          'text-lg px-7 py-3': size === 'lg',
        },
        outline ? ' border-2' : 'text-gray-50',
        [
          `ring-${variant}-200`,
          outline
            ? disabled ? `border-${variant}-200 text-${variant}-200` : `border-${variant}-500 text-${variant}-500 hover:bg-${variant}-500 hover:text-gray-50`
            : disabled ? `bg-${variant}-400` : `bg-${variant}-500`,
        ],
        innerClassName
      )}
      disabled={disabled}
       {...rest}
    >
      {children}
    </button>
  </Ripple>
);

export default Button;
