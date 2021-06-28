import type { AppProps } from 'next/app';
import React from 'react';
import Container from '../components/atom/Container';
import Navbar from '../components/atom/Navbar';
import { ModalProvider } from 'async-modals';
import '../styles/index.css';
import classNames from 'classnames';
import { FiFeather, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import IconButton from '../components/atom/IconButton';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ModalProvider
    backgroundClassName={(isExiting) =>
      classNames(
        'fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-40',
        isExiting ? 'animate-modal-bg-fade-out' : 'animate-modal-bg-fade-in'
      )
    }
    exitDelay={200}
  >
    <div className='bg-gray-50 min-h-screen select-none'>
      <Navbar>
        <Container className={'flex justify-between'}>
          <Link href='/'>
            <a className={'flex items-center'}>
              <FiFeather className={'text-primary-500 mr-4'} size={32} />
              Review App
            </a>
          </Link>
          <div className={'flex items-center'}>
            {/* TODO: Hook this up to the search modal */}
            <IconButton variant='none' icon={FiSearch} />

            {/* TODO: make this the account thingy */}
            <div className={'ml-8 w-10 h-10 bg-gray-600 rounded-full'}></div>
          </div>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </div>
  </ModalProvider>
);

export default MyApp;
