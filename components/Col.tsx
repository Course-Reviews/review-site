import classnames from 'classnames';
import React, { HTMLAttributes } from 'react';

interface ColProps extends HTMLAttributes<HTMLElement> {}

const Col: React.FC<ColProps> = ({ children, className, ...rest }) => (
  <div className={classnames('flex flex-col mx-2 w-full', className)} {...rest}>
    {children}
  </div>
);

export default Col;
