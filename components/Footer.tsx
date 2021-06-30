import { useModal } from 'async-modals';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {

  const modal = useModal(FeedbackModal);

  return(
  <footer className=' w-full text-center px-4 py-4 text-gray-600 bottom-0'>
    <p>Copyright © 2021 Review</p>
    <button onClick={() => modal.show()} className='font-bold text-primary-400'>Leave Feedback</button>
  </footer>
)
};

export default Footer;
