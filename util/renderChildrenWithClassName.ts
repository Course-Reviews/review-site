import classNames from 'classnames';
import React, { ReactNode } from 'react';

export const renderChildrenWithClassName = (children: ReactNode, className: string) => React.Children.map(children, (child: any) =>
    React.createElement(child?.type, {
      ...child.props,
      className: classNames(
        className,
        child?.props.className
      ),
    })
  );
