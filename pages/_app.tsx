import type { AppProps } from 'next/app';
import React from 'react';
import Container from '../components/atom/Container';
import Navbar from '../components/atom/Navbar';
import { ModalProvider, useModal } from 'async-modals';
import '../styles/index.css';
import classNames from 'classnames';
import { FiFeather, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import IconButton from '../components/atom/IconButton';
import SearchModal from '../components/SearchModal';
import SearchButton from '../components/SearchButton';
import ScrollToTop from '../components/ScrollToTop';
import NavSearch from '../components/NavSearch';
import { isMobile } from 'react-device-detect';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Mobile search opens the modal instead
  console.log(isMobile);
  return (
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
            <div className={`flex items-center ${isMobile ? 'w-2/3' : 'w-1/3'} justify-end`}>
               <SearchButton className={'sm:hidden'} /> <NavSearch className={'hidden sm:flex'} />
            </div>
          </Container>
        </Navbar>
        <Component {...pageProps} />
        <ScrollToTop />
      </div>
    </ModalProvider>
  );
};

export default MyApp;
