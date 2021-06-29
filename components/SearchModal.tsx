import { Modal as ModalType } from 'async-modals';
import classNames from 'classnames';
import React from 'react';
import { FiX } from 'react-icons/fi';
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
    <div className={'text-gray-800 flex items-center justify-end -mx-1'}>
        <button onClick={cancel}>
          <FiX size={24} />
        </button>

    </div>
    <CourseSearch />
  </div>
);

export default SearchModal;
