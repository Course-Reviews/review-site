import { yupResolver } from '@hookform/resolvers/yup';
import { Modal as ModalType } from 'async-modals';
import mixpanel from 'mixpanel-browser';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';
import { number, object, SchemaOf, string } from 'yup';
import { reviewResponse } from '../functions/fetchReviews';
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

interface FormFields {
  workloadRating: number;
  contentRating: number;
  deliveryRating: number;
  content?: string;
  term: number;
  year: string;
}

const formFields = {
  workloadRating: 'workloadRating',
  contentRating: 'contentRating',
  deliveryRating: 'deliveryRating',
  content: 'content',
  term: 'term',
  year: 'year',
} as const;

const YEARS = ['2020', '2021'];

const schema: SchemaOf<FormFields> = object().shape({
  workloadRating: number().required('Please choose a workload rating between 1 and 5'),
  contentRating: number().required('Please choose a content rating between 1 and 5'),
  deliveryRating: number().required('Please choose a delivery rating between 1 and 5'),
  content: string().max(5000, 'Please keep your review to a maximum of 5000 characters'),
  term: number().required(),
  year: string().required(),
});

const PostReviewModal: React.FC<ModalType<ModalData, reviewResponse>> = ({
  data,
  isClosing,
  cancel,
  submit,
}) => {
  const terms = data.terms.filter((t, i) => data.terms.indexOf(t) === i).sort();

  const [submitted, setSubmitted] = useState(false);

  const [review, setReview] = useState<reviewResponse>();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      year: '2021',
      term: terms[0],
    },
    resolver: yupResolver(schema),
  });

  const handleValidSubmit: SubmitHandler<FormFields> = async ({
    workloadRating,
    deliveryRating,
    contentRating,
    content,
    term,
    year,
  }) => {

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
          <Button onClick={() => (review ? submit(review) : cancel())}>
            Back to {data.code}
            <FiArrowRight size={24} className={'ml-2 -m-2'} />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <FormGroup label='Taken In' required>
            <Row>
              <Col className={'w-2/3 md:w-1/2'}>
                <Dropdown
                  options={terms.map((t) => ({ label: TERMS[t], value: t }))}
                  control={control}
                  name={formFields.term}
                />
              </Col>
              <Col className={'w-1/3 md:w-1/2'}>
                <Dropdown
                  options={YEARS.map((v) => ({ label: v, value: v }))}
                  control={control}
                  name={formFields.year}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup label='Workload' required error={errors.workloadRating}>
            <RatingInput className={'mt-1'} name={formFields.workloadRating} control={control} />
          </FormGroup>
          <FormGroup label='Content Quality' required error={errors.contentRating}>
            <RatingInput className={'mt-1'} name={formFields.contentRating} control={control} />
          </FormGroup>
          <FormGroup label='Delivery of Content' required error={errors.deliveryRating}>
            <RatingInput className={'mt-1'} name={formFields.deliveryRating} control={control} />
          </FormGroup>
          <FormGroup label='Review' error={errors.content}>
            <Input
              as='textarea'
              placeholder='Provide a written review (optional)'
              className={'h-48'}
              {...register(formFields.content)}
            />
          </FormGroup>

          <div className={'flex flex-col mt-4 first:mt-0'}>
            <Button
              block
              onClick={() => {
                mixpanel.track('[REVIEW MODAL] Post');
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
