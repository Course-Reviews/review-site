import React from 'react';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { useState } from 'react';
import Expand from './Expand';
import classNames from 'classnames';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import IconButton from './IconButton';
import Ripple from './Ripple';

interface AccordianProps extends HTMLAttributes<HTMLElement> {}

const Accordian: React.FC<AccordianProps> = ({ children, className, ...rest }) => (
  <div className={classnames('mb-2', className)}>{children}</div>
);

interface AccordianItemProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
}

const AccordianItem: React.FC<AccordianItemProps> = ({
  children,
  expanded: e = false,
  className,
  ...rest
}) => {
  const [expanded, setExpanded] = useState<boolean>(e);

  return (
    <div className={classnames('flex flex-col mt-2 first:mt-0', className)} {...rest}>
      {React.Children.map(children, (child: any) =>
        React.createElement(child?.type, { ...child.props, expanded, setExpanded })
      )}
    </div>
  );
};

interface AccordianHeaderProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
}

const AccordianHeader: React.FC<AccordianHeaderProps> = ({
  children,
  className,
  expanded,
  setExpanded,
  ...rest
}) => (
  <div
    onClick={() => setExpanded && setExpanded((v) => !v)}
    className={classnames(
      'cursor-pointer flex items-center justify-between py-1 px-1 border-b hover:bg-gray-50 rounded-t-lg',
      className
    )}
  >
    <div>{children}</div>
    <IconButton
      size={'sm'}
      variant='none'
      icon={FiChevronDown}
      innerClassName={classNames('transform transition-transform', !expanded && '-rotate-90')}
    />
  </div>
);

interface AccordianBodyProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
}

const AccordianBody: React.FC<AccordianBodyProps> = ({
  expanded,
  children,
  className,
  setExpanded,
  ...rest
}) => (
  <Expand expanded={expanded} {...rest}>
    {children}
  </Expand>
);

export default Object.assign(Accordian, {
  Item: AccordianItem,
  Header: AccordianHeader,
  Body: AccordianBody,
});
