import { Modal as ModalType } from 'async-modals';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight, FiStar, FiUser } from 'react-icons/fi';
import { reviewResponse } from '../functions/fetchReviews';
import Button from './atom/Button';
import Modal from './atom/Modal';

const benefits = [
  'Upvote/Downvote other users\' reviews',
  'Edit your reviews after you post them',
  'View exclusive course information',
  'Earn points & badges (coming soon)',
]

interface ModalData {
  url: string;
}

const SignupBenefitsModal: React.FC<ModalType<ModalData, boolean>> = ({
  data,
  isClosing,
  cancel,
  submit,
}) => {

  const redirectToSignin = () => {
    sessionStorage.setItem('authRedirect', `${data.url}?post=true`);
    submit(true)
  }

  return(
  <Modal isClosing={isClosing} className={'w-full sm:w-1/2 md:max-w-md m-4 text-center'}>
    <Modal.Title close={cancel}>Woah!</Modal.Title>
    <FiUser size={56} className={'text-primary-500 mx-auto'} fill='currentColor'/>
    <h1 className={'text-2xl font-bold text-gray-800 mt-2 mb-4 mx-10'}>You need an account to do that</h1>
    <p className={'text-opacity-75'}>
      {
        'By signing up you get access to the following features and more!'
      }
    </p>
    <ul className={'mx-8'}>
      {benefits.map((v, i) =>
      <li className={'flex my-3 font-semibold'} key={i}>
        <FiStar fill={'currentColor'} className={'text-primary-500 mr-2 mb-1 '} size={24}/> <div className={'text-left'}>{v}</div>
      </li>)}
    </ul>
    <Button block className={'mb-4'}>
      Sign up
    </Button>
    <button
      className={'font-semibold text-primary-500 mt-2 flex mx-auto items-center'}
      onClick={cancel}
    >
      Already have an account? Sign in
    </button>
  </Modal>
)
};

export default SignupBenefitsModal;
