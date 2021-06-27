import type { AppProps } from 'next/app';
import React from 'react';
import Container from '../components/atom/Container';
import Navbar from '../components/atom/Navbar';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className='bg-gray-50 min-h-screen select-none'>
    <Navbar>
      <Container>Review App</Container>
    </Navbar>
    <Component {...pageProps} />
  </div>
);

export default MyApp;
