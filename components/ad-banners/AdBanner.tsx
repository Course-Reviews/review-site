import * as React from 'react';
import Image from 'next/image';
import logo from '../../assets/logo-full.svg';
import learneryLogo from '../../assets/learnery-logo.svg';

interface AdBannerProps { }

const AdBanner: React.FunctionComponent<AdBannerProps> = () => (
  <a
    className='w-full bg-white p-4 mt-4 flex justify-between cursor-pointer'
    href='https://bit.ly/3NEQG0M'
    target='_blank' rel='noreferrer'
  >
    <div className='md:w-2/5 w-2/3 flex flex-col md:flex-row  items-center justify-between content-center m-auto'>
      <Image src={learneryLogo} alt='learnery-logo' />
      <span
        style={{
          fontSize: 16,
        }}
      >
        Learn anything you want <b>10 times faster</b>, fully <b>personalized</b> to you.
      </span>
    </div>
  </a>
);

export default AdBanner;
