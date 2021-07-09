import { Modal as ModalType } from 'async-modals';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { reviewResponse } from '../functions/fetchReviews';
import Button from './atom/Button';
import Modal from './atom/Modal';

const SignupPromptModal: React.FC<ModalType<void, boolean>> = ({
  data,
  isClosing,
  cancel,
  submit,
}) => (
  <Modal isClosing={isClosing} className={'w-full sm:w-1/2 md:max-w-md m-4 text-center'}>
    <Modal.Title close={cancel}>Create an Account</Modal.Title>
    <p>
      {
        'You\'ll still be able to post 100% anonymously, as well as edit your reviews and vote on other users reviews'
      }
    </p>
    <Link href={'/account/signup'}>
      <a>
        <Button block className={'mt-4'} onClick={() => submit(true)}>
          Sign up
        </Button>
      </a>
    </Link>
    <p className={'my-2 '}>or</p>
    <Button block className={'mb-4'}>
      Sign in with google
    </Button>
    <p>You can still post without an account, however you wont be able to edit your review later</p>

    <button
      className={'font-semibold text-primary-500 mt-2 flex mx-auto items-center'}
      onClick={cancel}
    >
      Continue to posting <FiArrowRight className={'ml-2'} size={20} />
    </button>
  </Modal>
);

export default SignupPromptModal;
