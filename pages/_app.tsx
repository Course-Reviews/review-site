import { ModalProvider } from 'async-modals';
import classNames from 'classnames';
import mixpanel from 'mixpanel-browser';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { FiFeather } from 'react-icons/fi';
import { MixpanelProvider } from 'react-mixpanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from '../components/atom/Container';
import Navbar from '../components/atom/Navbar';
import Footer from '../components/Footer';
import NavSearch from '../components/NavSearch';
import ScrollToTop from '../components/ScrollToTop';
import SearchButton from '../components/SearchButton';
import '../styles/index.css';
import Image from 'next/image';
import Logo from '../components/Logo';

const MyApp = ({ Component, pageProps }: AppProps) => {
  mixpanel.init('08d4d7028dcc32f1449375dc93c154c7');
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
                <a className={'flex items-center h-8'}>
                  <Logo className={'h-12 w-12 mx-4'}/>
                  <span className={'text-gray-700 font-semibold'}>Course Reviews</span>
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
      <ToastContainer />
    </MixpanelProvider>
  );
};

export default MyApp;
