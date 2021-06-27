
import { Modal as ModalType } from 'async-modals';
import React from 'react';
import Input from './atom/Input';
import Modal from './atom/Modal';

const MessageModal: React.FC<ModalType<void, void>> = ({isClosing, cancel}) => (
    <Modal isClosing={isClosing} className={'w-full sm:w-1/2 md:w-1/3 m-4'}>
      <Modal.Title close={cancel}>Add a Review</Modal.Title>
      <Input/>
    </Modal>
  )

export default MessageModal;