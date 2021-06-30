import { Modal as ModalType } from 'async-modals';
import React, { useState } from 'react';
import { FiChevronDown, FiChevronsDown } from 'react-icons/fi';
import { TERMS } from '../types/config';
import Button from './atom/Button';
import Col from './atom/Col';
import Dropdown from './atom/Dropdown';
import FormGroup from './atom/FormGroup';
import Input from './atom/Input';
import Modal from './atom/Modal';
import RatingInput from './atom/RatingInput';
import Row from './atom/Row';
import StarRating from './atom/StarRating';

interface ModalData {
  terms: number[];
  code: string;
}

interface ReviewData {
  rating: number;
  content?: string;
  term: string;
}

const YEARS = ['2020', '2021'];

const PostReviewModal: React.FC<ModalType<ModalData, void>> = ({ data, isClosing, cancel }) => {
  let termIndex = data.terms.findIndex((v) => v === 3 || v === 5);
  if (termIndex === -1) termIndex = 0;

  const [formdata, setFormdata] = useState<Partial<ReviewData>>({
    term: TERMS[termIndex],
  });

  return (
    <Modal isClosing={isClosing} className={'w-full sm:w-1/2 md:w-1/3 m-4'}>
      <Modal.Title close={cancel}>Review {data.code}</Modal.Title>
      <form>
      <FormGroup label='Taken In' required>
          <Row>
            <Col className={'w-1/2'}>
              <Dropdown
                options={data.terms.map((t) => ({ label: TERMS[t], value: t }))}
                selectedIndex={termIndex}
              />
            </Col>
            <Col className={'w-1/2'}>
              <Dropdown options={YEARS.map((v) => ({ label: v, value: v }))} selectedIndex={1} />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup label='Rating' required>
          <RatingInput className={'mt-1'} />
        </FormGroup>
        <FormGroup label='Review'>
          <Input as='textarea' />
        </FormGroup>

        <div className={'flex flex-col mt-4 first:mt-0'}>
          <Button block>Post Review</Button>
        </div>
      </form>
    </Modal>
  );
};

export default PostReviewModal;
