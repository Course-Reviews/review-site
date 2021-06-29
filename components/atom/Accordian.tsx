import React from 'react';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { useState } from 'react';
import Expand from './Expand';
import classNames from 'classnames';
import { FiChevronUp } from 'react-icons/fi';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';

interface AccordianProps extends HTMLAttributes<HTMLElement> {}

const Accordian: React.FC<AccordianProps> = ({ children, className, ...rest }) => (
  <div className={classnames('flex flex-col mb-2', className)}>{children}</div>
);

interface AccordianItemProps extends HTMLAttributes<HTMLElement> {}

const AccordianItem: React.FC<AccordianItemProps> = ({ children, className, ...rest }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={classnames('flex flex-col mt-2 first:mt-0', className)}>
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
  <div onClick={() => setExpanded && setExpanded(v => !v) } className={classnames('cursor-pointer flex items-center justify-between pb-1 my-1 border-b', className)}>
    <div>{children}</div>
    <button>
      <FiChevronUp
        size={24}
        className={classNames('transform transition-transform', !expanded && 'rotate-180')}
      />
    </button>
  </div>
);

interface AccordianBodyProps extends HTMLAttributes<HTMLElement> {
  expanded?: boolean;
  setExpanded?: Dispatch<SetStateAction<boolean>>
}

const AccordianBody: React.FC<AccordianBodyProps> = ({
  expanded,
  children,
  className,
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
