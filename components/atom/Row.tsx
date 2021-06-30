import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

interface RowProps extends HTMLAttributes<HTMLElement> {}

const Row: React.FC<RowProps> = ({ children, className, ...rest }) => (
  <div className={classNames('flex -mx-2', className)} {...rest}>{children}</div>
);

export default Row;
