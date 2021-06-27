import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import { FiX } from 'react-icons/fi';
import Card from './Card';

interface ModalProps extends HTMLAttributes<HTMLElement> {
  isClosing?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isClosing, children, className, ...rest }) => (
  <Card className={classNames(isClosing ? 'animate-float-out' : 'animate-float-in', 'mx-4', className)} {...rest}>
    <Card.Body>{children}</Card.Body>
  </Card>
);

interface ModalTitleProps extends HTMLAttributes<HTMLElement> {
  close?: () => void;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ close, children, className, ...rest }) => (
  <Card.Title
    className={'text-gray-800 flex items-start justify-between -mx-1'}
    {...rest}
  >
    {children}
    {close && <button onClick={close}><FiX size={24}/></button>}
  </Card.Title>
);

export default Object.assign(Modal, {
  Title: ModalTitle,
});
