import { Modal as ModalType } from 'async-modals';
import classNames from 'classnames';
import React from 'react';
import Input from './atom/Input';
import Modal from './atom/Modal';
import CourseSearch from './CourseSearch';

const SearchModal: React.FC<ModalType<void, void>> = ({ isClosing, cancel }) => (
  <div
    className={classNames(
      isClosing ? 'animate-float-out' : 'animate-float-in',
      'w-full h-full bg-white p-4'
    )}
  >
    <Modal.Title close={cancel}> </Modal.Title>
    <CourseSearch />
  </div>
);

export default SearchModal;
