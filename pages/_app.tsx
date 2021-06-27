import type { AppProps } from 'next/app';
import React from 'react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className='bg-gray-50 min-h-screen'>
    <Navbar>
      <Container>Review App</Container>
    </Navbar>
    <Component {...pageProps} />
  </div>
);

export default MyApp;
