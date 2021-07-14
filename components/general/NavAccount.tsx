import { useModal } from 'async-modals';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FiChevronDown, FiInstagram, FiLogOut, FiMessageSquare, FiSettings, FiUser } from 'react-icons/fi';
import Expand from '../atom/Expand';
import IconButton from '../atom/IconButton';
import FeedbackModal from '../FeedbackModal';
import { AuthContext } from './CognitoAuthProvider';

interface NavAccountProps {}

const NavAccount: React.FC<NavAccountProps> = ({}) => {
  const { user } = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  const feedbackModal = useModal(FeedbackModal);

  const { signOut } = useContext(AuthContext);

  return (
    <div className={'relative self-center mx-4'}>
      <button
        className={'flex-col cursor-pointer hidden sm:flex mt-1'}
        onBlur={() => setExpanded(false)}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className={'text-sm text-gray-500 font-semibold'}>Signed in as</div>
        <div className={'text-gray-800 font-semibold -mt-1 flex items-center'}>
          <div>{user?.username}</div>
          <FiChevronDown size={16} className={'ml-1 mt-1'} />
        </div>
      </button>
      <IconButton
        className={'sm:hidden'}
        variant='none'
        icon={FiUser}
        onBlur={() => setExpanded(false)}
        onClick={() => setExpanded((v) => !v)}
      />
      <Expand
        expanded={expanded}
        className={'bg-white shadow-md rounded-lg absolute z-10 w-48 right-0'}
      >
        <ul className={'p-2 text-gray-700'}>
          {
            <div className={'md:hidden block'}>
              <li className={'px-2 font-semibold text-primary-500'}>
                Signed in as <span className={'text-primary-600 font-bold'}>{user?.username}</span>
              </li>
              <hr className={'my-1'} />
            </div>
          }
          <li className={'px-2 font-semibold'}>Account</li>
          <Link href='/account/reviews'>
            <a>
              <li
                className={
                  'p-1 px-3 cursor-pointer hover:bg-gray-100 flex items-center hover:text-primary-500'
                }
              >
                <FiUser className={'mr-2 mt-1'} />
                My Reviews
              </li>
            </a>
          </Link>
          <Link href='/account/settings'>
            <a>
              <li
                className={
                  'p-1 px-3 cursor-pointer hover:bg-gray-100 flex items-center hover:text-primary-500'
                }
              >
                <FiSettings className={'mr-2 mt-1'} />
                Settings
              </li>
            </a>
          </Link>
          <hr className={'my-1'} />
          <li className={'px-2 font-semibold'}>Connect with us</li>
          <li
            className={
              'p-1 px-3 cursor-pointer hover:bg-gray-100 flex items-center hover:text-primary-500'
            }
            onClick={() => feedbackModal.show()}
          >
            <FiMessageSquare className={'mr-2 mt-1'} />
            Give feedback
          </li>

          <a href={'https://www.instagram.com/coursereview.nz/'} target='social'>
            <li
              className={
                'p-1 px-3 cursor-pointer hover:bg-gray-100 flex items-center hover:text-primary-500'
              }
            >
              <FiInstagram className={'mr-2 mt-1'} />
              Instagram
            </li>
          </a>
          <hr className={'my-1'} />
          <li
            className={
              'p-1 px-3 cursor-pointer hover:bg-gray-100 flex items-center hover:text-primary-500'
            }
            onClick={signOut}
          >
            <FiLogOut className={'mr-2 mt-1'} />
            Sign out
          </li>
        </ul>
      </Expand>
    </div>
  );
};

export default NavAccount;
