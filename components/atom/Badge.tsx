import classnames from 'classnames';
import React, { HTMLAttributes } from 'react';
import { Color } from '../../types/tailwind';

interface BadgeProps extends HTMLAttributes<HTMLElement> {
  variant?: Color;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className, ...rest }) => (
  <div
    className={classnames(
      `bg-${variant}-500 text-${variant}-100 font-bold px-3 py-0.5 rounded-full`,
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Badge;
