import React from 'react';
import classnames from 'classnames';
import { SVGAttributes } from 'react';

const Logo: React.FC<SVGAttributes<SVGElement>> = ({ className, fill, ...rest }) => (
  <svg
    width='242'
    height='193'
    viewBox='0 0 242 193'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...rest}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M28.8 66.4C28.8 42.6 46.5 23.9 69.5 23.9C80.4 23.9 90.8 27.9 98.8 35.3L114.5 17.6C102.2 6.3 86.2 0 69.5 0C46.8 0 19.5 15 19.5 43.5C19.5 54.8 24 66.3 29.4 73.7C29 71.3 28.8 68.9 28.8 66.4ZM0 66.3C0 59.1 1.2 52.2 3.4 45.7C5.9 82.2 31.8 108.5 65 108.4C76.8 108.4 90.3 104.6 99.7 98.2L114.6 115C102.3 126.4 86.3 132.7 69.5 132.7C31.9 132.7 0 104 0 66.3ZM235.5 109.7C235.5 126.1 226.4 140.3 212.9 147.8L242 192.2H215.8L190.4 153.3H189.4H156.2V192.1H133V66H184.7C201.3 66 217.8 72.9 217.8 88.2C217.8 97.1 213.7 104.4 208.1 109.8V109.6C208.1 98.4 198.8 89.2 187.3 89.2H156.2V130.1H195.7C216.5 130.1 229.2 115.2 233.8 97.7C234.9 101.5 235.5 105.6 235.5 109.7Z'
      fill={fill || 'url(#paint0_linear)'}
    />
    <defs>
      <linearGradient
        id='paint0_linear'
        x1='14'
        y1='192'
        x2='237.582'
        y2='14.496'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#6F40FF' />
        <stop offset='1' stopColor='#C240FF' />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
