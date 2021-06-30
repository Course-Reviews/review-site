import { Modal as ModalType } from 'async-modals';
import React, { useState } from 'react';
import { FiChevronDown, FiChevronsDown } from 'react-icons/fi';
import { TERMS } from '../types/config';
import Button from './atom/Button';
import Col from './atom/Col';
import Dropdown, { Option } from './atom/Dropdown';
import FormGroup from './atom/FormGroup';
import Input from './atom/Input';
import Modal from './atom/Modal';
import RatingInput from './atom/RatingInput';
import Row from './atom/Row';
import StarRating from './atom/StarRating';
import { MixpanelConsumer } from 'react-mixpanel';
import { toast } from 'react-toastify';

interface ModalData {
  terms: number[];
  code: string;
}

interface ReviewData {
  rating: number;
  content?: string;
  term: string;
  year: string;
}

const YEARS = ['2020', '2021'];

const PostReviewModal: React.FC<ModalType<ModalData, void>> = ({ data, isClosing, cancel }) => {
  let termIndex = data.terms.findIndex((v) => v === 3 || v === 5);
  if (termIndex === -1) termIndex = 0;

  const [formdata, setFormdata] = useState<Partial<ReviewData>>({
    term: TERMS[termIndex],
  });


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    console.log(formdata);
    toast('Review posted!', {
      type: 'success',
      position: 'bottom-right'
    })
  }

  return (
    <MixpanelConsumer>
      {(mixpanel: any) => (
        <Modal isClosing={isClosing} className={'w-full sm:w-3/4 md:w-2/3 lg:max-w-lg m-4'}>
          <Modal.Title close={cancel}>Review {data.code}</Modal.Title>
          <form onSubmit={handleSubmit}>
            <FormGroup label='Taken In' required>
              <Row>
                <Col className={'w-1/2'}>
                  <Dropdown
                    options={data.terms.map((t) => ({ label: TERMS[t], value: t }))}
                    selectedIndex={termIndex}
                    onChange={v => setFormdata(d => ({...d, term: v.value}))}
                  />
                </Col>
                <Col className={'w-1/2'}>
                  <Dropdown
                    options={YEARS.map((v) => ({ label: v, value: v }))}
                    selectedIndex={1}
                    onChange={v => setFormdata(d => ({...d, year: v.value}))}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup label='Rating' required>
              <RatingInput className={'mt-1'} onChange={v => setFormdata(d => ({...d, rating: v}))} />
            </FormGroup>
            <FormGroup label='Review'>
              <Input as='textarea' disabled className={'h-48'} onChange={e => setFormdata(d => ({...d, content: e.target.value}))}/>
            </FormGroup>

            <div className={'flex flex-col mt-4 first:mt-0'}>
              <Button
                block
                onClick={() => {
                  mixpanel.track('[REVIEW MODAL] Post');
                }}
              >
                Post Review
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </MixpanelConsumer>
  );
};

export default PostReviewModal;
