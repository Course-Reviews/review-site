import { Modal as ModalType } from 'async-modals';
import React, { useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';
import { fetchReviewsResponse, reviewResponse } from '../functions/fetchReviews';
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
  workloadRating: number;
  contentRating: number;
  deliveryRating: number;
  content?: string;
  term: number;
  year: string;
}

const YEARS = ['2020', '2021'];

const PostReviewModal: React.FC<ModalType<ModalData, reviewResponse>> = ({ data, isClosing, cancel, submit }) => {
  let termIndex = data.terms.findIndex((v) => v === 3 || v === 5);
  if (termIndex === -1) termIndex = 0;

  const [formdata, setFormdata] = useState<Partial<ReviewData>>({
    term: termIndex,
  });

  const [formerrors ,setFormerrors] = useState<Partial<{[k in keyof ReviewData]: string}>>({});

  const [submitted, setSubmitted] = useState(false);

  const[review, setReview]= useState<reviewResponse>();
  // const review = useRef<fetchReviewsResponse>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { workloadRating, contentRating, deliveryRating, content, term, year } = formdata as any;

    // validation
    const errors:Partial<{[k in keyof ReviewData]: string}> = {};

    if(!workloadRating){
      errors.workloadRating = 'Please choose a rating for workload'
    }
    if(!contentRating){
      errors.contentRating = 'Please choose a rating for content'
    }
    if(!deliveryRating){
      errors.deliveryRating = 'Please choose a rating for delivery'
    }
    if(content && content.length > 1000){
      errors.content = `Reviews are limited to 1000 characters (currently ${content.length})`
    }
    setFormerrors(errors)
    if(Object.keys(errors).length > 0){
      return;
    }

    // console.log('Posting!');
    setSubmitted(true);
    const res = await postReview(data.courseId, {
      course_rating: (workloadRating + deliveryRating + contentRating) / 3,
      content,
      taken_date: `${TERMS[term]} ${year}`,
      workload_rating: workloadRating,
      content_rating: contentRating,
      delivery_rating: deliveryRating,
    });
    setReview(res);

  };

  return (
    <Modal isClosing={isClosing} className={'w-full sm:w-3/4 md:w-2/3 lg:max-w-lg m-4'}>
      <Modal.Title close={cancel}>Review {data.code}</Modal.Title>
      {review ? (
        <div className={'flex flex-col items-center text-primary-500 my-8'}>
          <UseAnimations
            reverse
            size={100}
            animation={radioButton}
            strokeColor={'currentColor'}
            speed={0.75}
          />
          <div className={'text-lg font-bold my-8'}>Thanks for leaving a review!</div>
          <Button onClick={() => review ? submit(review) : cancel()}>
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
          <FormGroup label='Workload' required error={formerrors.workloadRating}>
            <RatingInput
              className={'mt-1'}
              onChange={(v) => setFormdata((d) => ({ ...d, workloadRating: v }))}
            />
          </FormGroup>
          <FormGroup label='Content Quality' required error={formerrors.contentRating}>
            <RatingInput
              className={'mt-1'}
              onChange={(v) => setFormdata((d) => ({ ...d, contentRating: v }))}
            />
          </FormGroup>
          <FormGroup label='Delivery of Content' required error={formerrors.deliveryRating}>
            <RatingInput
              className={'mt-1'}
              onChange={(v) => setFormdata((d) => ({ ...d, deliveryRating: v }))}
            />
          </FormGroup>
          <FormGroup label='Review' error={formerrors.content}>
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
              disabled={submitted}
            >
              {submitted ? 'Posting...' : 'Post Anonymous Review'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default PostReviewModal;
