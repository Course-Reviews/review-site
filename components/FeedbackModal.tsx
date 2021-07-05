import { Modal as ModalType } from 'async-modals';
import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';
import Button from './atom/Button';
import FormGroup from './atom/FormGroup';
import Input from './atom/Input';
import Modal from './atom/Modal';
import { MixpanelConsumer } from 'react-mixpanel';

interface ModalData {
  prefilled?: string;
}

const PostReviewModal: React.FC<ModalType<ModalData, void>> = ({
  data = {},
  isClosing,
  cancel,
}) => {
  const [message, setMessage] = useState<string | undefined>(data.prefilled);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MixpanelConsumer>
      {(mixpanel: any) => (
        <Modal isClosing={isClosing} className={'w-full sm:w-3/4 md:w-2/3 lg:max-w-lg m-4'}>
          <Modal.Title close={cancel}>Give us Feedback</Modal.Title>
          {submitted ? (
            <div className={'flex flex-col items-center text-primary-500 my-8'}>
              <UseAnimations
                reverse
                size={100}
                animation={radioButton}
                strokeColor={'currentColor'}
                speed={0.75}
              />
              <div className={'text-lg font-bold my-8'}>Thanks for the feedback!</div>
              <Button onClick={cancel}>
                Continue browsing Courses
                <FiArrowRight size={24} className={'ml-2 -m-2'} />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormGroup label='Message'>
                <Input
                  as='textarea'
                  placeholder='Something we can do better? Want to request a feature? Let us know!'
                  className={'h-48'}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormGroup>

              <div className={'flex flex-col mt-4 first:mt-0'}>
                <Button
                  block
                  onClick={() => {
                    mixpanel.track('[FEEDBACK]', { value: message });
                  }}
                >
                  Send Feedback
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </MixpanelConsumer>
  );
};

export default PostReviewModal;
