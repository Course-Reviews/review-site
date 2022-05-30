import * as React from 'react';
import Image from 'next/image';
import logo from '../../assets/logo-full.svg';

interface AdBannerProps {}

const AdBanner: React.FunctionComponent<AdBannerProps> = () => (
  <a
    className='w-full bg-white p-4 mt-4 flex justify-between cursor-pointer'
    href='https://bit.ly/3NEQG0M'
    target='_blank'
  >
    <div className='md:w-2/5 w-2/3 flex flex-col md:flex-row  items-center justify-between content-center m-auto'>
      <Image src={logo} alt='fistbump-logo' />
      <span
        style={{
          fontSize: 17,
        }}
      >
        Make <b>friends</b> and <b>socialize</b> on <b>UoA</b> campus
      </span>
    </div>
  </a>
);

export default AdBanner;
