import { ModalProvider } from 'async-modals';
import classNames from 'classnames';
import mixpanel from 'mixpanel-browser';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { MixpanelProvider } from 'react-mixpanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appbar from '../components/general/Appbar';
import { CognitoAuthProvider } from '../components/general/CognitoAuthProvider';
import Footer from '../components/general/Footer';
import ScrollToTop from '../components/general/ScrollToTop';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  mixpanel.init('08d4d7028dcc32f1449375dc93c154c7');

  return (
    <CognitoAuthProvider>
      <MixpanelProvider mixpanel={mixpanel}>
        <Head>
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <ModalProvider
          backgroundClassName={(isExiting) =>
            classNames(
              'fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-40',
              isExiting ? 'animate-modal-bg-fade-out' : 'animate-modal-bg-fade-in'
            )
          }
          exitDelay={200}
        >
          <div className='bg-gray-50 min-h-screen flex flex-col justify-between relative pb-32 md:pb-16'>
            <Appbar />
            <Component {...pageProps} />
            <Footer />
            <ScrollToTop />
          </div>
        </ModalProvider>
        <ToastContainer />
      </MixpanelProvider>
    </CognitoAuthProvider>
  );
};

export default MyApp;
