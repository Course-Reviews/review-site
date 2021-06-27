import type { AppProps } from 'next/app';
import React from 'react';
import Container from '../components/atom/Container';
import Navbar from '../components/atom/Navbar';
import { ModalProvider } from 'async-modals';
import '../styles/index.css';
import classNames from 'classnames';
import { FiFeather } from 'react-icons/fi';
import Link from 'next/link';

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
        <Container>
          <Link href='/'>
            <a className={'flex items-center'}>
              <FiFeather className={'text-primary-500 mr-4'} size={32} />
              Review App
            </a>
          </Link>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </div>
  </ModalProvider>
);

export default MyApp;
