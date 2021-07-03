import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/atom/Button';
import notFoundGuy from '../assets/not-found-guy.svg';
const NotFound = () => (
  <div className='container flex justify-center flex-col items-center my-2 mx-auto'>
    <h2 className='font-bold text-2xl text-primary-600 my-4'>404</h2>
    <div className='h-1/4 w-1/2 mx-auto'>
      <Image src={notFoundGuy} alt='vector graphic of a guy in a purple jacket with a telescope' />
    </div>
    <h1 className='font-bold text-xl my-4'>Page not found, sorry.</h1>
    <Link href='/'>
      <a>
        <a className='text-center pt-4 font-bold '>
          <Button>Take me home</Button>
        </a>
      </a>
    </Link>
  </div>
);

export default NotFound;
