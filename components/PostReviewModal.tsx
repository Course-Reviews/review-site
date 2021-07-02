import { Modal as ModalType } from 'async-modals';
import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';
import postReview from '../functions/postReview';
import { TERMS } from '../types/config';
import Button from './atom/Button';
import Col from './atom/Col';
import Dropdown from './atom/Dropdown';
import FormGroup from './atom/FormGroup';
import Input from './atom/Input';
import Modal from './atom/Modal';
import RatingInput from './atom/RatingInput';
import Row from './atom/Row';
interface ModalData {
  terms: number[];
  code: string;
  courseId: string;
}

interface ReviewData {
  rating: number;
  content?: string;
  term: number;
  year: string;
}

const YEARS = ['2020', '2021'];

const PostReviewModal: React.FC<ModalType<ModalData, void>> = ({ data, isClosing, cancel }) => {
  let termIndex = data.terms.findIndex((v) => v === 3 || v === 5);
  if (termIndex === -1) termIndex = 0;

  const [formdata, setFormdata] = useState<Partial<ReviewData>>({
    term: termIndex,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { rating, content, term, year } = formdata;
    if (!rating || !term || !year) return;
    console.log('Posting!');

    await postReview(data.courseId, {
      course_rating: rating,
      content,
      taken_date: `${TERMS[term]} ${year}`,
      workload_rating: 5,
      content_rating: 5,
      delivery_rating: 5,
    });

    setSubmitted(true);
  };

  return (
    <Modal isClosing={isClosing} className={'w-full sm:w-3/4 md:w-2/3 lg:max-w-lg m-4'}>
      <Modal.Title close={cancel}>Review {data.code}</Modal.Title>
      {submitted ? (
        <div className={'flex flex-col items-center text-primary-500 my-8'}>
          <UseAnimations
            reverse
            size={100}
            animation={radioButton}
            strokeColor={'currentColor'}
            speed={0.75}
          />
          <div className={'text-lg font-bold my-8'}>Thanks for leaving a review!</div>
          <Button onClick={cancel}>
            Back to {data.code}
            <FiArrowRight size={24} className={'ml-2 -m-2'} />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormGroup label='Taken In' required>
            <Row>
              <Col className={'w-2/3 md:w-1/2'}>
                <Dropdown
                  options={data.terms.map((t) => ({ label: TERMS[t], value: t }))}
                  selectedIndex={termIndex}
                  onChange={(v) => setFormdata((d) => ({ ...d, term: v.value }))}
                />
              </Col>
              <Col className={'w-1/3 md:w-1/2'}>
                <Dropdown
                  options={YEARS.map((v) => ({ label: v, value: v }))}
                  selectedIndex={1}
                  onChange={(v) => setFormdata((d) => ({ ...d, year: v.value }))}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup label='Rating' required>
            <RatingInput
              className={'mt-1'}
              onChange={(v) => setFormdata((d) => ({ ...d, rating: v }))}
            />
          </FormGroup>
          <FormGroup label='Review'>
            <Input
              as='textarea'
              placeholder='Provide a written review (optional)'
              className={'h-48'}
              onChange={(e) => setFormdata((d) => ({ ...d, content: e.target.value }))}
            />
          </FormGroup>

          <div className={'flex flex-col mt-4 first:mt-0'}>
            <Button
              block
              onClick={() => {
                // mixpanel.track('[REVIEW MODAL] Post');
              }}
            >
              Post Anonymous Review
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default PostReviewModal;
