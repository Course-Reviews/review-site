import { Modal as ModalType } from 'async-modals';
import React from 'react';
import { FiChevronDown, FiChevronsDown } from 'react-icons/fi';
import Button from './atom/Button';
import Col from './atom/Col';
import Input from './atom/Input';
import Modal from './atom/Modal';
import Row from './atom/Row';
import StarRating from './atom/StarRating';

const PostReviewModal: React.FC<ModalType<void, void>> = ({ isClosing, cancel }) => (
  <Modal isClosing={isClosing} className={'w-full sm:w-1/2 md:w-1/3 m-4'}>
    <Modal.Title close={cancel}>Add a Review</Modal.Title>
    <form>
      <div className={'flex flex-col mt-4 first:mt-0'}>
        <label className={'ml-2 text-sm'}>Rating</label>
        <StarRating rating={0} className={'mt-1'} />
      </div>
      <div className={'flex flex-col mt-4 first:mt-0'}>
        <label className={'ml-2 text-sm'}>Message</label>
        <Input className={'mt-1'} as='textarea' />
      </div>
      <div className={'flex flex-col mt-4 first:mt-0'}>
        <label className={'ml-2 text-sm'}>Taken in</label>
        <Row>
          <Col className={'w-1/2'}>
            <Button block variant={'gray'}>Sem 1 <FiChevronDown className={'absolute right-4'} size={20}/></Button>
          </Col>
          <Col className={'w-1/2'} >
            <Button variant={'gray'} block>2021</Button>
          </Col>
        </Row>
      </div>
      <div className={'flex flex-col mt-4 first:mt-0'}>
        <Button block>Post Review</Button>
      </div>
    </form>
  </Modal>
);

export default PostReviewModal;
