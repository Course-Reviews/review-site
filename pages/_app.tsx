import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
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
import Footer from '../components/Footer';
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider, MixpanelConsumer } from 'react-mixpanel';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Mobile search opens the modal instead
  mixpanel.init('08d4d7028dcc32f1449375dc93c154c7');
  // console.log(mixpanel);
  return (
    <MixpanelProvider mixpanel={mixpanel}>
      <ModalProvider
        backgroundClassName={(isExiting) =>
          classNames(
            'fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-40',
            isExiting ? 'animate-modal-bg-fade-out' : 'animate-modal-bg-fade-in'
          )
        }
        exitDelay={200}
      >
        <div className='bg-gray-50 min-h-screen select-none flex flex-col justify-between'>
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
          <Footer />
          <ScrollToTop />
        </div>
      </ModalProvider>
    </MixpanelProvider>
  );
};

export default MyApp;
