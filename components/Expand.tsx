import classnames from 'classnames';
import React, { HTMLAttributes, useEffect, useRef } from 'react';

interface ExpandProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
}

const Expand: React.FC<ExpandProps> = ({ children, className, expanded, ...rest }) => {
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
  }, [expanded]);

  return (
    <div
      ref={container}
      className={classnames(
        'h-0 transition-height overflow-hidden duration-300 flex flex-col',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Expand;
