import React from 'react';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { useState } from 'react';
import Expand from './Expand';

interface AccordianProps extends HTMLAttributes<HTMLElement> {}

const Accordian: React.FC<AccordianProps> = ({ children, className, ...rest }) => (
  <div className={classnames('container mx-auto', className)}>{children}</div>
);

interface AccordianItemProps extends HTMLAttributes<HTMLElement> {}

const AccordianItem: React.FC<AccordianItemProps> = ({ children, className, ...rest }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return <div className={classnames('container mx-auto', className)}>{children}</div>;
};

interface AccordianHeaderProps extends HTMLAttributes<HTMLElement> {}

const AccordianHeader: React.FC<AccordianHeaderProps> = ({ children, className, ...rest }) => (
  <div className={classnames('container mx-auto', className)}>{children}</div>
);

interface AccordianBodyProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
}

const AccordianBody: React.FC<AccordianBodyProps> = ({ expanded, children, className, ...rest }) => (
  <Expand expanded={expanded} {...rest}>
    {children}
  </Expand>
);

export default Object.assign(Accordian, {
  Item: AccordianItem,
  Header: AccordianHeader,
  Body: AccordianBody,
});
