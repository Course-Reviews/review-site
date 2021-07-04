import React, { HTMLAttributes } from 'react';

import classnames from 'classnames';
import { Color, } from '../../types/tailwind';

interface ProgressProps extends HTMLAttributes<HTMLElement> {
  progress: number;
  max?: number;
  variant?: Color;
}

const Progress: React.FC<ProgressProps> = ({ variant = 'primary', progress, max = 100, className }) => (
  <div className={classnames('flex bg-gray-100 h-4 w-full rounded overflow-hidden', className)}>
    <div className={classnames(`bg-${variant}-500 rounded `)} style={{width: `${(progress / max) * 100}%`,backgroundPosition: '0px 0px',
  backgroundRepeat: 'repeat-x'}}></div>
  </div>
);

export default Progress;
