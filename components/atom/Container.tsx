import React, { ElementType, HTMLAttributes } from 'react';

import classnames from 'classnames';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

const Container: React.FC<ContainerProps> = ({ children, className, as: Component = 'div', ...rest }) => (
  <Component className={classnames('container p-4 mx-auto', className)} {...rest}>{children}</Component>
);

export default Container;
