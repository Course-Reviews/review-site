import { Modal as ModalType } from 'async-modals';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { reviewResponse } from '../functions/fetchReviews';
import Button from './atom/Button';
import Modal from './atom/Modal';

interface ModalData {
  url: string;
}

const SignupPromptModal: React.FC<ModalType<ModalData, boolean>> = ({
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
    <Modal.Title close={cancel}>Create an Account</Modal.Title>
    <p>
      {
        'You\'ll still be able to post 100% anonymously, as well as edit your reviews and vote on other users reviews'
      }
    </p>
    <Link href={'/account/signup'}>
      <a>
        <Button block className={'my-4'} onClick={redirectToSignin}>
          Sign up
        </Button>
      </a>
    </Link>
    <p>You can still post without an account, however you wont be able to edit your review later</p>

    <button
      className={'font-semibold text-primary-500 mt-2 flex mx-auto items-center'}
      onClick={cancel}
    >
      Post without an account <FiArrowRight className={'ml-2'} size={20} />
    </button>
  </Modal>
)
};

export default SignupPromptModal;
