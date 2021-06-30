import classnames from 'classnames';
import React, { ElementType, HTMLAttributes, useEffect, useRef } from 'react';

interface ExpandProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
  as?: ElementType;
}

const Expand: React.FC<ExpandProps> = ({ children, className, expanded, as: Component = 'div', ...rest }) => {
  const container = useRef<any>(0);

  useEffect(() => {
    const element = container.current as HTMLElement;
    if (expanded) {
      element.style.height = `${Array.prototype.reduce.call(
        element.childNodes,
        (p, c) => p + (c.offsetHeight || 0),
        0
      )}px`;
    } else {
      element.style.height = '0px';
    }
  }, [expanded, children]);

  return (
    <Component
      ref={container}
      className={classnames(
        'transition-height overflow-hidden duration-300 flex flex-col',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Expand;
