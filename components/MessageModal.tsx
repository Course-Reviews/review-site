
import { Modal as ModalType } from 'async-modals';
import React from 'react';
import Input from './atom/Input';
import Modal from './atom/Modal';

const MessageModal: React.FC<ModalType<void, void>> = ({isClosing, cancel}) => (
    <Modal isClosing={isClosing} className={'w-full'}>
      <Modal.Title close={cancel}>Add a Review</Modal.Title>
      <Input/>
    </Modal>
  )

export default MessageModal;